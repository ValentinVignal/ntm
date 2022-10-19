import { ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { NtmLangiumAstType, Person } from './generated/ast';
import type { NtmLangiumServices } from './ntm-langium-module';

/**
 * Registry for validation checks.
 */
export class NtmLangiumValidationRegistry extends ValidationRegistry {
    constructor(services: NtmLangiumServices) {
        super(services);
        const validator = services.validation.NtmLangiumValidator;
        const checks: ValidationChecks<NtmLangiumAstType> = {
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class NtmLangiumValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
