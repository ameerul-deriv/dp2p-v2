import { api } from '@/hooks';
import { render, screen, waitFor } from '@testing-library/react';
import MyProfileCounterpartiesTable from '../MyProfileCounterpartiesTable';

const mockProps = {
    dropdownValue: 'all',
    setShowHeader: jest.fn(),
    searchValue: '',
};

const mockApiValues = {
    data: [],
    isFetching: false,
    isLoading: false,
    loadMoreAdvertisers: jest.fn(),
};

jest.mock('@deriv-com/api-hooks', () => ({
    useGetList: jest.fn(() => mockApiValues),
}));

jest.mock('@/components/Modals/BlockUnblockUserModal', () => ({
    BlockUnblockUserModal: () => <div>BlockUnblockUserModal</div>,
}));

const mockUseGetList = api.advertiser.useGetList as jest.Mock;
describe('MyProfileCounterpartiesTable', () => {
    it('should render the empty results when there is no data', () => {
        render(<MyProfileCounterpartiesTable {...mockProps} />);
        expect(screen.getByText('No one to show here')).toBeInTheDocument();
    });
    it('should render Loader when isLoading is true', () => {
        mockUseGetList.mockReturnValue({
            ...mockApiValues,
            isLoading: true,
        });
        render(<MyProfileCounterpartiesTable {...mockProps} />);
        expect(screen.getByTestId('dt_derivs-loader')).toBeInTheDocument();
    });
    it('should show header when data is present', async () => {
        mockUseGetList.mockReturnValue({
            ...mockApiValues,
            data: [{ id: 'id1', name: 'name1', is_blocked: false }],
        });
        render(<MyProfileCounterpartiesTable {...mockProps} />);

        await waitFor(() => {
            expect(mockProps.setShowHeader).toHaveBeenCalledWith(true);
        });
    });
    it('should show the corresponding message when search value is provided and no matching name is found', () => {
        mockUseGetList.mockReturnValue({
            ...mockApiValues,
            data: [],
        });
        const newProps = {
            ...mockProps,
            searchValue: 'test',
        };
        render(<MyProfileCounterpartiesTable {...newProps} />);
        expect(screen.getByText('There are no matching name')).toBeInTheDocument();
    });
});
