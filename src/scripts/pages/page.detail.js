/**
 * 描述
 * @authors hyh
 * @date    2018-05-30 17:42:12
 */
$('.ui-custom-service').click(function(){
    var buttons1 = [
        {
            text: '17323879909',
            color: 'blue',
            onClick: function() {
                console.log(this.text)
            }
        }
    ];
    var buttons2 = [
        {
            color: 'blue',
            text: '取消'

        }
    ];
    var groups = [buttons1, buttons2];
    $.actions(groups);
});