export const getText = (str: any) => {
    const doc = new DOMParser().parseFromString(str, "text/html")
    return doc.body.textContent;
}