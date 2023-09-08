CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ 
DECLARE 
iterator INTEGER := 0;
user_id TEXT := '';
org_id TEXT := '';
wallet_id TEXT := '';
iteratorInside INTEGER := 0;
transaction_id TEXT := 0;
BEGIN
    WHILE iterator < (SELECT COUNT(*) FROM "user_account")
    LOOP
        iterator := iterator + 1;
        user_id := (SELECT "id" FROM "user_account" ORDER BY id OFFSET iterator -1 LIMIT 1);
        org_id := (SELECT "organizationId" FROM "user_account" where id = user_id);
        wallet_id := uuid_generate_v1();
        INSERT INTO wallet ("id", "organizationId", "userId", "name", "description", "amount", "createdAt", "updatedAt") VALUES (wallet_id, org_id, user_id, 'Default Wallet', 'Default Wallet', 1000, now(), now());
        iteratorInside := 0;
        WHILE iteratorInside < (SELECT COUNT(*) FROM "transaction" WHERE "userId"=user_id)
        LOOP
            iteratorInside := iteratorInside + 1;
            transaction_id := (SELECT "id" FROM "transaction" WHERE "userId"=user_id ORDER BY "id" OFFSET iteratorInside -1 LIMIT 1);
            UPDATE "transaction" SET "walletId"=wallet_id WHERE "id"=transaction_id;
        END LOOP;
    END LOOP;
END $$;