class PregMatch {
    email(value) {
        var pattern = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
        return pattern.test(value);
    }
}

export default PregMatch;