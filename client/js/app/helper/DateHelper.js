export class DateHelper {
    constructor() {
        throw new Error('Esta classe não deve ser instanciada');
    }

    /**
     * Converte uma string no formato AAAA-MM-DD para Date
     * 
     * @param {string} textValue 
     */
    static textToDate(textValue) {
        if (!/\d{2}\/\d{2}\/\d{4}/.test(textValue)) {
            throw new Error('A data deve estar no formato dd/mm/yyyy');
        }

        return new Date(...textValue.split('/').reverse().map((v, idx) => v - idx % 2))
    }

    /**
     * Converte uma Date para string no formato DD/MM/AAAA
     * 
     * @param {Date} dateValue 
     */
    static dateToText(dateValue) {
        return `${dateValue.getDate()}/${dateValue.getMonth()+1}/${dateValue.getFullYear()}`;
    }
}