export default function thousands(str) {
    if (str) {
        return str.split( /(?=(?:\d{3})+(?:\.|$))/g ).join(",")
    }
    return str;
}