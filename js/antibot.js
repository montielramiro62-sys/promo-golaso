// Simulación de comportamiento humano y manipulación de User-Agent
document.addEventListener('DOMContentLoaded', () => {
    // Generar un User-Agent aleatorio común para evitar bloqueos básicos
    const agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
    ];
    // Nota: En un entorno real, el navegador define el UA, pero esto ayuda en scripts de fetch/iframe si se usan.
    
    // Crear cookies falsas para simular sesión previa
    document.cookie = "session_id=" + Math.random().toString(36).substr(2, 9) + "; path=/";
    document.cookie = "utm_source=promo_grandtasty; path=/";

    // Detectar si el scroll es automático (bots suelen no hacer scroll)
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        hasScrolled = true;
    });
    
    // Si no se hace scroll en 3 segundos, simular un pequeño scroll
    setTimeout(() => {
        if (!hasScrolled) {
            window.scrollBy(0, 10);
        }
    }, 3000);
});
