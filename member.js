function skillsMember() {
    var member = document.getElementById("member").value;
    var memberError = document.getElementById("memberError");
    var memberReg = /^[A-Za-z0-9]{3,20}$/;
    if (memberReg.test(member) == false) {
        memberError.innerHTML = "Member name must be 3-20 characters long";
        memberError.style.color = "red";
        return false;
    } else {
        memberError.innerHTML = "";
        return true;
    }
}