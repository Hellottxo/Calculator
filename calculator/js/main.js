
$(function(){
    
    'use stricr'

    $('.num').each(function() {
        
        $(this).click(function(){
           
            var number_id = $(this).attr('id')
            var id = parseFloat(number_id)
            
            if (number_id != '=' && number_id != 'C') {             
              
                $('input').val($('input').val() + $(this).html())                                                 
          
            } else {
               
                if (number_id =='C'){
                    Cl() 
                } else {
                   
                    input_num = $('input').val()             
                    var arr = getArr(input_num)     
                    var result = runFirst(arr)
                    $('input').val(result)      
                    
                    }
                }
            })
        })
        // 归零键
        function Cl() {
            var clear_num = ''
            $('input').val(clear_num) 
        }
        // 将输入的方程解析为两个数组
        function getArr(input_num) {
            var i
            var j = 0
            var arr = {}
            var num_arr = []
            var item_arr = []
            for( i=0;i<input_num.length;i++ ) {
                if( isNaN(input_num[i]) ) {
                    item_arr[j] = input_num[i]
                    j++
                    input_num = input_num.substring(0,i)+'|'+input_num.substring(i+1,input_num.length);
                }
            }
            num_arr = input_num.split('|')
            for(i=0;i<num_arr.length;i++) {
                num_arr[i]=Number(num_arr[i])
            }
            arr.num_arr = num_arr
            arr.item_arr = item_arr
            return arr
        }
        // 优先级运算
        function runFirst(arr) {
            var cList = [['*','/'],['+','-']]
            var cIndex = 0
            while(arr.item_arr.length>0) {
                for(i=0;i<arr.item_arr.length;i++) {
                    for(j=0;j<cList[cIndex].length;j++) {
                        if(arr.item_arr[i]==cList[cIndex][j]) {
                            var arr = runOnce(arr,i)
                            i = -1  // 重置循环
                            break
                        }
                    }
                }
                cIndex++
            }
            return arr.num_arr
        }

        // 判断符号并进行运算
        function runOnce(arr,i) {
            var op = arr.item_arr[i]
            number1 = arr.num_arr[i]
            number2 = arr.num_arr[i+1]
            var res = 0
            switch(op) {
                case op='+': res = number1 + number2;break;
                case op='-': res = number1 - number2;break;
                case op='*': res = number1 * number2;break;
                case op='/': res = number1 / number2;break;
            }
            arr.item_arr.splice(i,1)
            arr.num_arr.splice(i,2,res)
            return arr
        }
})




 
