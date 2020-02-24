$('body').css('backgroundColor','skyblue');

$(document).ready(function(){

    $.ajax({

        type:'get',
        dataType:'json',
        url:'http://localhost:3000/getStudent?hometown=delhi',
        success:function(data){
            
            
            $('button').click(function(){
                $('#result').append('<ul></ul>')
                for(i=0;i<data.length;i++){
                    $('ul').append('<li>'+data[i].firstname+'  ' +data[i].lastname+'  from  -'+data[i].hometown+'</li>');
                }
            })
        }

    });

});