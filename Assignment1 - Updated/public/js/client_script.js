function logout() {
    document.getElementById("accountform").action = "/";
    //document.getElementById("accountform").method = "get";
    document.getElementById("accountform").submit();
}

