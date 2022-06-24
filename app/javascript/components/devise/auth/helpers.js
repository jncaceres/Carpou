
export const Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}

export const checkBirthdate = (date) =>{
    const input_year = new Date(date).getFullYear();
    if(2022-input_year >=18){
        return true
    }else{
        return false
    }
}

export const date = (date = new Date()) => {
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let today = new Date(date);
    let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let today_format =
      today.getFullYear() +
      "-" +
      months[today.getMonth()] +
      "-" +
      day 
    return today_format;
  };
