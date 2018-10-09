$(document).ready(function(){
    $(".process").hide();
    $(".request").click(function(e){
        e.preventDefault();
        var is_user_authenticated = "{{request.user.is_authenticated}}";

        if( is_user_authenticated == true)
        {
            alert("You need to register before requesting verification.");
        }
        else
        {
            var issue=$(this).closest(".single_issue");
            var pr_link=$("input[name='pr_link']",issue).val();
            console.log(pr_link);
            var issue_id = $(".issue_info", issue).attr('issue-id');
            var csrf=$(".single_issue").attr('csrf');
            // $(".process",this).show();
            if(pr_link != ""){
                $.ajax({
                    url:'request_pr',
                    data:{
                        'pr_link':pr_link,
                        'issue_id': issue_id,
                        'csrfmiddlewaretoken':csrf,
                    },
                    type:'post',
                    cache:false,
                    beforeSend: function(){
                        // $(".request").html('<i class="fa fa-spinner fa-spin fa-1x"></i>');
                        $(".process",this).show();
                    },
                    success: function(data){
                        if(data){
                            alert(data);
                            document.location.reload();      
                        }
                    },
                    afterSend: function(){
                        // $(".request").html(' request for verification ');
                        $(".process",this).hide();
                    },
                });
            }else{
                alert("First put your PR link with the corresponding issue.");
            }
        }
    });

    $('.delete').click(function(e){
        e.preventDefault();
        var issue = $(this).closest('.single_issue');
        var issue_id = $(".issue_info", issue).attr('issue-id');
        var csrf=$(".single_issue").attr('csrf');
        
        $.ajax({
            url:'remove_issue',
            data:{
                'issue_id': issue_id,
                'csrfmiddlewaretoken':csrf,
            },
            type:'post',
            cache:false,
            beforeSend:function(){
               // alert("Requesting server ...")
            },
            success:function(data){
                if(data){
                    alert(data);
                    document.location.reload();  
                }
            }
        });
    });

});