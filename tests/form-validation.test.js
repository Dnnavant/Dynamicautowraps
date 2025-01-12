import { FormValidator } from '../js/form-validation';

describe('FormValidator', () => {
    let formValidator;
    
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="test-form">
                <input type="text" id="name" required>
                <input type="email" id="email" required>
                <button type="submit">Submit</button>
            </form>
        `;
        formValidator = new FormValidator('test-form');
    });

    test('validates required fields', () => {
        const nameInput = document.getElementById('name');
        const isValid = formValidator.validateField(nameInput);
        expect(isValid).toBeFalsy();
    });

    test('validates email format', () => {
        const emailInput = document.getElementById('email');
        emailInput.value = 'invalid-email';
        const isValid = formValidator.validateField(emailInput);
        expect(isValid).toBeFalsy();
    });
}); 