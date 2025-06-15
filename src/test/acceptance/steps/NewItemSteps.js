class NewItemGivenSteps extends Steps{

    test_items_available(){
        this.test.utils.addTestItems();
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

    auto_delete_at_as(value){
        let autoDeleteRng = getRng(RNG.NEW_ITEM_AUTO_DELETE);
        autoDeleteRng.setValue(value);
    }

    new_serving_as_1g(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(1, 16);
        itemsRng.setValue('g', 17);
    }

    new_serving_as_1_bowl(){
        let itemsRng = getRng(RNG.NEW_ITEM_FIELDS);
        itemsRng.setValue(150, 16);
        itemsRng.setValue('bowl', 17);
    }

    additinal_water_of(water){
        getRng(RNG.NEW_ITEM_FIELDS).setValue(water, 18);
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

    item_name_set_to(name){
        this.changeCbox(SPR.NEW_ITEM, CBOX.NEW_ITEM_NAME, name);
    }
}

class NewItemThenSteps extends ItemThenSteps{

    item_loaded_to_form_as(expected){
        let itemsForm = getRng(RNG.NEW_ITEM_FIELDS).getValues().flat();
        this.test.assertEqualsArray(itemsForm, [ ... expected, 'Never', '', '', '']);
    }

    form_is_clear(){
        let itemsForm = getRng(RNG.NEW_ITEM_FIELDS).getValues().flat();
        this.test.assertEmpty(itemsForm[0]);
        this.test.assertEmpty(itemsForm[1]);
        this.test.assertEmpty(itemsForm[2]);
        this.test.assertEmpty(itemsForm[3]);
        this.test.assertEmpty(itemsForm[4]);
        this.test.assertEmpty(itemsForm[5]);
        this.test.assertEmpty(itemsForm[6]);
        this.test.assertEmpty(itemsForm[7]);
        this.test.assertEmpty(itemsForm[8]);
        this.test.assertEmpty(itemsForm[9]);
        this.test.assertEmpty(itemsForm[10]);
        this.test.assertEmpty(itemsForm[11]);
        this.test.assertEmpty(itemsForm[12]);
        this.test.assertEmpty(itemsForm[13]);
        this.test.assertEmpty(itemsForm[15]);
        this.test.assertEmpty(itemsForm[16]);
        this.test.assertEmpty(itemsForm[17]);
        this.test.assertEquals(itemsForm[14], "Never");
        this.test.assertEquals(getRng(RNG.NEW_ITEM_NOOM_CATEGORY).getValue(), "Solid");
        this.test.assertEquals(getRng(RNG.NEW_ITEM_NOOM_COLOUR).getFormula(), "=F22");
    }
}