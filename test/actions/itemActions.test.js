import { expect } from 'chai';
import * as ItemActions from '../../app/actions/itemActions';
import * as types from '../../app/constants';

describe('action creators testing', () => {
    it('it should add an item', () => {
        const expectedAction = {
            type: types.ADD_ITEM
        }
        expect(ItemActions.addItem()).to.be.deep.equal(expectedAction)
    })

    it('it should delete an item', () => {
        const item = 1;
        const expectedAction = {
            type: types.DELETE_ITEM,
            item
        }
        expect(ItemActions.deleteItem(item)).to.be.deep.equal(expectedAction)
    })

    it('it should delete all items', () => {
        const expectedAction = {
            type: types.DELETE_ALL
        }
        expect(ItemActions.deleteAll()).to.be.deep.equal(expectedAction)
    })
})

