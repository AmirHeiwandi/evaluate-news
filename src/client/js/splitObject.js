// Split the object
function splitObject (info) {
    if (info === 'error'){
        return 'error';
    }
    else {
        let list = [];
        list[0] = `${info.text.slice(0, 40)}...`;
        list[1] = info.polarity;
        list[2] = info.subjectivity;
        return list;
    }
}

export { splitObject }