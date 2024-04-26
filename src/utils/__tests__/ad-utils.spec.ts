import { TCurrency, TPaymentFieldType, TWalletType } from 'types';
import { getFilteredCountryList } from '../ad-utils';

type TNumber = 0 | 1;
type TStatus = 'enabled' | 'disabled';
describe('ad-utils', () => {
    describe('getFilteredCountryList', () => {
        it('should return an empty object with empty country list', () => {
            const countryList = {};
            const result = getFilteredCountryList(countryList);
            expect(result).toEqual({});
        });
        it('should return the filtered country list based on the payment methods availability', () => {
            const mockCountryList = {
                countryA: {
                    country_name: 'countryA',
                    cross_border_ads_enabled: 1 as TNumber,
                    fixed_rate_adverts: 'enabled' as TStatus,
                    float_rate_adverts: 'disabled' as TStatus,
                    float_rate_offset_limit: 10,
                    local_currency: 'CA' as TCurrency,
                    payment_methods: {
                        alipay: {
                            id: '3',
                            display_name: 'Alipay',
                            fields: {
                                account: {
                                    display_name: 'Alipay ID',
                                    required: 1,
                                    type: 'text' as TPaymentFieldType,
                                },
                                instructions: {
                                    display_name: 'Instructions',
                                    required: 0,
                                    type: 'memo' as TPaymentFieldType,
                                },
                            },
                            type: 'ewallet' as TWalletType,
                        },
                    },
                },
                countryB: {
                    country_name: 'countryB',
                    cross_border_ads_enabled: 1 as TNumber,
                    fixed_rate_adverts: 'enabled' as TStatus,
                    float_rate_adverts: 'disabled' as TStatus,
                    float_rate_offset_limit: 10,
                    local_currency: 'CB' as TCurrency,
                    payment_methods: {
                        bank_transfer: {
                            id: '2',
                            display_name: 'Bank Transfer',
                            fields: {
                                account: {
                                    display_name: 'Bank Account',
                                    required: 1,
                                    type: 'text' as TPaymentFieldType,
                                },
                                instructions: {
                                    display_name: 'Instructions',
                                    required: 0,
                                    type: 'memo' as TPaymentFieldType,
                                },
                            },
                            type: 'other' as TWalletType,
                        },
                    },
                },
            };

            const expectedResult = {
                countryB: { ...mockCountryList.countryB },
            };

            const result = getFilteredCountryList(mockCountryList, ['bank_transfer']);
            expect(result).toEqual(expectedResult);
        });
    });
});