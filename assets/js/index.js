let passwordLength = 16;
const inputEl = document.getElementById('password');
const upperCaseCheckEl = document.querySelector('#uppercase-check')
const numberCheckEl = document.querySelector('#number-check')
const symbolCheckEl = document.querySelector('#symbol-check')
const securityIndicatorBarEl = document.querySelector('#security-indicator-bar')
const securityLevelTextEl = document.querySelector('#security-level-text');


// Função para gerar a senha aleatória
function generatePassword() {
    let chars = 'abcdefghjkmnpqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHJKMNPQRSTUVWXYZ'
    const numberChars = '123456789'
    const symbolChars = '?!@&*()[]'

    if(upperCaseCheckEl.checked){
        chars += upperCaseChars
    }

    if(numberCheckEl.checked){
        chars += numberChars
    }

    if(symbolCheckEl.checked){
        chars += symbolChars
    }
    
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars[randomNumber];
    }

    inputEl.value = password;
    calculateQuality()
    calculateFontSize()
}

//calcula o tamanho da fonte
function calculateFontSize () {
    if(passwordLength > 45) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')
    }else if(passwordLength > 35){
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.add('font-xs')
    }else if(passwordLength > 25) {
        inputEl.classList.remove('font-xxs')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-sm')
    }else {
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.remove('font-sm')
    }
}

//funcao que calcula a qualidade da minha senha
function calculateQuality () {

    const percent = Math.round((passwordLength / 64) * 25
    + (upperCaseCheckEl.checked ? 15 : 0))
    + (numberCheckEl.checked ? 25 : 0)
    + (symbolCheckEl.checked ? 35 : 0)


    securityIndicatorBarEl.style.width = `${percent}%`

    if (percent > 85) {
        //super safe
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('super-safe')
        securityLevelTextEl.classList.add('security-level-text-super-safe')
        securityLevelTextEl.classList.remove('security-level-text-safe')
        securityLevelTextEl.classList.remove('security-level-text-warning')
        securityLevelTextEl.classList.remove('security-level-text-critical')
        securityText = 'Senha super segura!'

    }else if(percent > 50){
        //safe
        securityIndicatorBarEl.classList.remove('super-safe')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('safe')
        securityLevelTextEl.classList.add('security-level-text-safe')
        securityLevelTextEl.classList.remove('security-level-text-super-safe')
        securityLevelTextEl.classList.remove('security-level-text-warning')
        securityLevelTextEl.classList.remove('security-level-text-critical')
        securityText = 'Senha segura.'

    }else if(percent > 30){
        // warning
        securityIndicatorBarEl.classList.remove('super-safe')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
        securityLevelTextEl.classList.add('security-level-text-warning')
        securityLevelTextEl.classList.remove('security-level-text-super-safe')
        securityLevelTextEl.classList.remove('security-level-text-safe')
        securityLevelTextEl.classList.remove('security-level-text-critical')
        securityText = 'Senha moderada. Considere melhorar.'

    }else {
        //critical
        securityIndicatorBarEl.classList.remove('super-safe')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('critical')
        securityLevelTextEl.classList.add('security-level-text-critical')
        securityLevelTextEl.classList.remove('security-level-text-super-safe')
        securityLevelTextEl.classList.remove('security-level-text-warning')
        securityLevelTextEl.classList.remove('security-level-text-safe')
        securityText = 'Senha muito fraca! Melhore a segurança.'
    }
        
    securityLevelTextEl.innerText = securityText;
}
// Função para atualizar o tamanho da senha dinamicamente
function updatePasswordLength() {
    const passwordLengthEl = document.querySelector('#password-length');
    passwordLength = passwordLengthEl.value;
    document.querySelector('#password-length-text').innerText = passwordLength
    generatePassword(); // Gere uma nova senha com o novo tamanho
}

// Função debounce para otimizar a execução de eventos
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function copyPassword() {
    navigator.clipboard.writeText(inputEl.value)
}

// Event Listener com debounce aplicado
const passwordLengthEl = document.querySelector('#password-length');
passwordLengthEl.addEventListener('input', debounce(updatePasswordLength, 75));

//event Listener de copy
const copyButtonEl = document.querySelector('#copy')
copyButtonEl.addEventListener('click', copyPassword)

//event listener de gerar uma nova senha
const renewEl = document.querySelector('#renew')
renewEl.addEventListener('click', generatePassword)
generatePassword();

//Event Listeners dos checkmarks
upperCaseCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)