import { setTextFilter } from '../../actions/filters'

test('should handle setTextFilter action object', () => {
    const text = 'test';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });

})