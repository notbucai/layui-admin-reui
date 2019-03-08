 function isNumber(inputStr){
		inputStr = String(inputStr)
		if(Number(inputStr) >= 1){
			return !/^[0]/.test(inputStr) || inputStr.indexOf('.')!=-1 && /\.[0-9]+$/.test(inputStr);
		}
      return !/^[0][0]+/.test(inputStr) && /\.[0-9]+$/.test(inputStr)&& /^[0-9]+(\.?[0-9])*$/.test(inputStr);
 }