const auth = {};
auth.getNum = (string) => {
    if (string === "student") {
        return 0;
    } else if (string === 'teacher') {
        return 1;
    } else if (string === 'admin') {
        return 2;
    } else if (string === 'super_admin') {
        return 3;
    }
};

auth.getType = (type) => {
    if (type <= 0) {
        return "student";
    } else if (type <= 1) {
        return "teacher";
    } else if (type <= 2) {
        return "admin";
    } else if (type <= 3) {
        return "super_admin";
    }
};

module.exports = auth;