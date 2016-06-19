(function()
{
    $('#deleteAccount').click(function()
    {
        $.ajax({
            type: 'POST',
            url: '/deleteAccount',
            data: { Username: user_data.username },
            error: function(xhr, status, err) { alert(err); }
        });
    });   
})();
