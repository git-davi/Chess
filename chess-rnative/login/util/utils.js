
export function setAttribute(attr, val, obj, setObj) {
    obj[attr] = val;
    setObj(obj);
}