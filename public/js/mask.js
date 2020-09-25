var dateMask=IMask(document.getElementById("date"),{mask:Date,pattern:"d-m-Y",blocks:{d:{mask:IMask.MaskedRange,from:1,to:31,maxLength:2},m:{mask:IMask.MaskedRange,from:1,to:12,maxLength:2},Y:{mask:IMask.MaskedRange,from:1900,to:9999}},format:function(e){var a=e.getDate(),t=e.getMonth()+1;return a<10&&(a="0"+a),t<10&&(t="0"+t),[a,t,e.getFullYear()].join("-")},parse:function(e){var a=e.split("-");return new Date(a[2],a[1]-1,a[0])},lazy:!0});const masks={phone:e=>e.replace(/\D/g,"").replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{4})(\d)/,"$1-$2").replace(/(\d{4})-(\d)(\d{4})/,"$1$2-$3").replace(/(-\d{4})\d+?$/,"$1"),height:e=>e.replace(/\D/g,"").replace(/(\d)(\d{2})/,"$1.$2").replace(/(.\d{2})\d+?$/,"$1"),weight:e=>e.replace(/\D/g,"").replace(/(\d)(\d{2})/,"$1.$2").replace(/(.\d{2})\d+?$/,"$1")};document.querySelectorAll(".input-masked").forEach(e=>{const a=e.dataset.mask;e.addEventListener("input",e=>{e.target.value=masks[a](e.target.value)},!1)});