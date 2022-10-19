import {
    createDefaultModule, createDefaultSharedModule, DefaultSharedModuleContext, inject,
    LangiumServices, LangiumSharedServices, Module, PartialLangiumServices
} from 'langium';
import { NtmLangiumGeneratedModule, NtmLangiumGeneratedSharedModule } from './generated/module';
import { NtmLangiumValidationRegistry, NtmLangiumValidator } from './ntm-langium-validator';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type NtmLangiumAddedServices = {
    validation: {
        NtmLangiumValidator: NtmLangiumValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type NtmLangiumServices = LangiumServices & NtmLangiumAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const NtmLangiumModule: Module<NtmLangiumServices, PartialLangiumServices & NtmLangiumAddedServices> = {
    validation: {
        ValidationRegistry: (services) => new NtmLangiumValidationRegistry(services),
        NtmLangiumValidator: () => new NtmLangiumValidator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createNtmLangiumServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    NtmLangium: NtmLangiumServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        NtmLangiumGeneratedSharedModule
    );
    const NtmLangium = inject(
        createDefaultModule({ shared }),
        NtmLangiumGeneratedModule,
        NtmLangiumModule
    );
    shared.ServiceRegistry.register(NtmLangium);
    return { shared, NtmLangium };
}
