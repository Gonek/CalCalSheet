class NewItemGivenSteps extends Steps{

    test_items_available(){
        testData.addTestItems();
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
        itemsRng.setValue(19, 15);
        itemsRng.setValue(20, 16);
    }

    auto_delete_at_as(value){
        let autoDeleteRng = getRng(RNG.NEW_ITEM_AUTO_DELETE);
        autoDeleteRng.setValue(value);
    }

    new_serving_as_1g(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(1, 18);
        itemsRng.setValue('g', 19);
    }

    new_serving_as_1_bowl(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(150, 18);
        itemsRng.setValue('bowl', 19);
    }

    additinal_water_of(water){
        getRng(RNG.NEW_ITEM_FIELDS).setValue(water, 20);
    }

    noom_category_as(noomCategory){
        getRng(RNG.NEW_ITEM_NOOM_CATEGORY).setValue(noomCategory);
    }

    noom_colour_as(noomColour){
        getRng(RNG.NEW_ITEM_NOOM_COLOUR).setValue(noomColour);
    }

    delete_items_as(names){
        getRng(BTNF.DELETE_ITEMS).setValue(names);
    }
}

class NewItemWhenSteps extends Steps{

    save_as_item_clicked(){
        this.clickButton(SHT.NEW_ITEM, BTN.SAVE_ITEM);
    }

    item_name_set_to(name){
        this.changeCbox(SHT.NEW_ITEM, CBOX.NEW_ITEM_NAME, name);
    }

    delete_items_clicked(){
        this.clickButtonWithField(SHT.NEW_ITEM, BTNF.DELETE_ITEMS, 'E33', 4);
    }
}

class NewItemThenSteps extends ItemThenSteps{

    item_loaded_to_form_as(expected){
        let itemsForm = getRng(RNG.NEW_ITEM_FIELDS).getValues().flat();
        assertEqualsArray(itemsForm, [ ... expected, 'Never', '', '', '']);
    }

    form_is_clear(){
        let itemsForm = getRng(RNG.NEW_ITEM_FIELDS).getValues().flat();
        assertEmpty(itemsForm[0]);
        assertEmpty(itemsForm[1]);
        assertEmpty(itemsForm[2]);
        assertEmpty(itemsForm[3]);
        assertEmpty(itemsForm[4]);
        assertEmpty(itemsForm[5]);
        assertEmpty(itemsForm[6]);
        assertEmpty(itemsForm[7]);
        assertEmpty(itemsForm[8]);
        assertEmpty(itemsForm[9]);
        assertEmpty(itemsForm[10]);
        assertEmpty(itemsForm[11]);
        assertEmpty(itemsForm[12]);
        assertEmpty(itemsForm[13]);
        assertEmpty(itemsForm[14]);
        assertEmpty(itemsForm[15]);
        assertEmpty(itemsForm[17]);
        assertEmpty(itemsForm[18]);
        assertEmpty(itemsForm[19]);
        assertEquals(itemsForm[16], "Never");
        assertEquals(getRng(RNG.NEW_ITEM_NOOM_CATEGORY).getValue(), "Solid");
        assertEquals(getRng(RNG.NEW_ITEM_NOOM_COLOUR).getFormula(), "=F24");
    }
}