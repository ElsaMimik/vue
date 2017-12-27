var Member = (function () {
    function Member() {
        this.userName = 'waiting...';
        this.loginId = 'waiting...';
        this.age = 0;
        this.ip = 'waiting...';
    }
    return Member;
}());
export { Member };
var LoginRequest = (function () {
    function LoginRequest() {
        this.loginId = '';
        this.password = '';
    }
    return LoginRequest;
}());
export { LoginRequest };
//# sourceMappingURL=member-m.js.map