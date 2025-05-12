/* main.js - Funções Comuns para a Aplicação */

/**
 * Objeto App contendo funções utilitárias.
 */
const App = {
  /**
   * Exibe uma mensagem de alerta em um container especificado e remove a mensagem automaticamente após um tempo.
   *
   * @param {string} containerId - O ID do container onde a mensagem será exibida.
   * @param {string} message - A mensagem a ser exibida.
   * @param {string} [type='info'] - O tipo do alerta (info, success, warning, danger).
   * @param {number} [timeout=4000] - Tempo em milissegundos para remover o alerta.
   */
  showAlert: (containerId, message, type = 'info', timeout = 4000) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Limpa mensagens anteriores
    container.innerHTML = '';
    
    // Cria um novo elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`);
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = message;
    
    container.appendChild(alertDiv);
    
    // Remove o alerta após o tempo especificado, com efeito fade
    setTimeout(() => {
      alertDiv.classList.add('fade');
      // Aguarda 500ms para o efeito de fade e remove o elemento
      setTimeout(() => {
        if (container.contains(alertDiv)) {
          container.removeChild(alertDiv);
        }
      }, 500);
    }, timeout);
  },

  /** 
   * Remove automaticamente todos os alertas existentes na página após um determinado tempo.
   * @param {number} [timeout=5000] - Tempo em milissegundos para iniciar a remoção dos alertas.*/
  autoFadeAlerts: (timeout = 5000) => {
    setTimeout(() => {
      const alerts = document.querySelectorAll('.alert');
      alerts.forEach(alert => {
        alert.classList.add('fade');
        setTimeout(() => {
          if (alert.parentElement) {
            alert.parentElement.removeChild(alert);
          }
        }, 500);
      });
    }, timeout);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para remover automaticamente alertas após 5 segundos.
  App.autoFadeAlerts();

});
