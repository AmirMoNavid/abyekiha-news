export const bytesToMb = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2);
}