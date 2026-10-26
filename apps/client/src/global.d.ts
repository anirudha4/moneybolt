type PendoMetadataValue = string | number | boolean | string[] | null | undefined;

type PendoMetadata = {
    id: string,
    [key: string]: PendoMetadataValue
};

type PendoOptions = {
    visitor?: PendoMetadata,
    account?: PendoMetadata
};

type Pendo = {
    initialize: (options: PendoOptions) => void,
    identify: (options: PendoOptions) => void,
    // not stubbed by the install snippet, so it only exists once the agent has loaded
    clearSession?: () => void
};

// Novus by Pendo agent, loaded by the install snippet in index.html
declare const pendo: Pendo;
