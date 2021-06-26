
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js')
      .then(reg => {
        console.log("Service worker esta listo!");
      });
}
else {
  console.log("Service worker no soportado.");
}


window.addEventListener('offline', event => {
  document.querySelector('body').classList.add('offline');
  main.innerHTML = `<section class="offline-response">
                      <img src="img/offline-icon.png" alt="">
                      <p>Ups! Este contenido no pudo ser cargado.</p>
                      <p>Revise si tiene problemas de conectividad.</p>
                   </section>`    
});


window.addEventListener('online', event => {
  document.querySelector('body').classList.remove('offline'); 
});


if (!navigator.onLine) {
  document.querySelector('body').classList.add('offline');
  main.innerHTML = `<section class="offline-response">
                       <img src="img/offline-icon.png" alt="">
                       <p>Ups! Este contenido no pudo ser cargado.</p>
                       <p>Revise si tiene problemas de conectividad.</p>
                    </section>`    
}