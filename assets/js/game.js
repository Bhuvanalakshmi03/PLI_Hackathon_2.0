$(document).ready(function () {
            
    $("#collaborateBtn").click(function () {
        $("#collaborateModal").modal();
    });

    
    $("#collaborateForm").submit(function (e) {
        e.preventDefault();
        const userId1 = $("#userId1").val();
        const teamName = $("#teamName").val();
        $("#collaborateModal").modal('hide');
        $("#gamifiedPage").show();
    });
});