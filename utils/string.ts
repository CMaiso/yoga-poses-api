export const getStringValue = (value: any): string | undefined => {
    return typeof value === 'string' ? value : Array.isArray(value) ? value[0] : undefined;
};