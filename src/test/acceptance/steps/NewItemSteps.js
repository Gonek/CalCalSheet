class NewItemGivenSteps extends Steps{

    test_items_available(){
        this.test.utils.addTestIems();
    }

    item_name_as(name){
        getRng(RNG.NEW_ITEM_FIELDS).setValue(name, 1);
    }

    serving_as_100g(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(100, 2);
        itemsRng.setValue('g', 3);
        itemsRng.setValue(100, 4);
    }

    serving_as_1_piece(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(1, 2);
        itemsRng.setValue('piece', 3);
        itemsRng.setValue(25, 4);
    }

    serving_as(amounth, unit, weight){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(amounth, 2);
        itemsRng.setValue(unit, 3);
        itemsRng.setValue(weight, 4);
    }

    calories_as(calories){
        getRng(RNG.NEW_ITEM_FIELDS).setValue(calories, 5, 1);
    }

    all_basic_macros(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(10, 6);
        itemsRng.setValue(11, 7);
        itemsRng.setValue(12, 8);
        itemsRng.setValue(13, 9);
        itemsRng.setValue(14, 10);
        itemsRng.setValue(15, 11);
        itemsRng.setValue(16, 12);
        itemsRng.setValue(17, 13);
        itemsRng.setValue(18, 14);
    }

    new_serving_as_1g(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(1, 15);
        itemsRng.setValue('g', 16);
    }

    new_serving_as_1_bowl(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(150, 15);
        itemsRng.setValue('bowl', 16);
    }

    additinal_water_of(water){
        getRng(RNG.NEW_ITEM_FIELDS).setValue(water, 17);
    }

    noom_category_as(noomCategory){
        getRng(RNG.NEW_ITEM_NOOM_CATEGORY).setValue(noomCategory);
    }

    noom_colour_as(noomColour){
        getRng(RNG.NEW_ITEM_NOOM_COLOUR).setValue(noomColour);
    }
}

class NewItemWhenSteps extends Steps{

    save_as_item_clicked(){
        this.clickButton(SPR.NEW_ITEM, BTN.SAVE_ITEM);
    }
}

class NewItemThenSteps extends ItemThenSteps{

    form_is_clear(){
        let itemsForm =getRng(RNG.NEW_ITEM_FIELDS).getValues();
        this.test.assertEmpty(itemsForm[0][0]);
        this.test.assertEmpty(itemsForm[1][0]);
        this.test.assertEmpty(itemsForm[2][0]);
        this.test.assertEmpty(itemsForm[3][0]);
        this.test.assertEmpty(itemsForm[4][0]);
        this.test.assertEmpty(itemsForm[5][0]);
        this.test.assertEmpty(itemsForm[6][0]);
        this.test.assertEmpty(itemsForm[7][0]);
        this.test.assertEmpty(itemsForm[8][0]);
        this.test.assertEmpty(itemsForm[9][0]);
        this.test.assertEmpty(itemsForm[10][0]);
        this.test.assertEmpty(itemsForm[11][0]);
        this.test.assertEmpty(itemsForm[12][0]);
        this.test.assertEmpty(itemsForm[13][0]);
        this.test.assertEmpty(itemsForm[14][0]);
        this.test.assertEmpty(itemsForm[15][0]);
        this.test.assertEmpty(itemsForm[16][0]);
        this.test.assertEquals(getRng(RNG.NEW_ITEM_NOOM_CATEGORY).getValue(), "Solid");
        this.test.assertEquals(getRng(RNG.NEW_ITEM_NOOM_COLOUR).getFormula(), "=F21");
    }
}