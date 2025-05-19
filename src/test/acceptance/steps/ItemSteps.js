class ItemThenSteps extends Steps{

    item_saved_with_name(name){
        this.name = name;
        this.itemRow = getSpr(SPR.ITEMS).getValues('B4:AA').find(r => r[0] == name);
        this.test.assertTrue(this.itemRow);
    }

    there_is_only_one_item_saved_with_this_name(){
       let itemRows = getSpr(SPR.ITEMS).getValues('B4:AA').filter(r => r[0] == this.name);
       this.test.assertEquals(itemRows.length, 1);
    }

    have_serving_as(amounth, unit, weight){
        this.test.assertEquals(this.itemRow[1], amounth);
        this.test.assertEquals(this.itemRow[2], unit);
        this.test.assertEquals(this.itemRow[3], weight);
    }

    have_calories_as(calories){
        this.test.assertEquals(this.itemRow[4], calories);
        this.test.assertEquals(this.itemRow[5], calories  / this.itemRow[1]);
    }

    have_basic_macros(){
        this.test.assertEquals(this.itemRow[6], 10);
        this.test.assertEquals(this.itemRow[7], 10 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[8], 11);
        this.test.assertEquals(this.itemRow[9], 11 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[10], 12);
        this.test.assertEquals(this.itemRow[11], 12 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[12], 13);
        this.test.assertEquals(this.itemRow[13], 13 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[14], 14);
        this.test.assertEquals(this.itemRow[15], 14 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[16], 15);
        this.test.assertEquals(this.itemRow[17], 15 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[18], 16);
        this.test.assertEquals(this.itemRow[19], 16 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[20], 17);
        this.test.assertEquals(this.itemRow[21], 17 / this.itemRow[1]);
        this.test.assertEquals(this.itemRow[22], 18);
        this.test.assertEquals(this.itemRow[23], 18 / this.itemRow[1]);
    }

    have_total_fat_as(value){
        this.test.assertEquals(this.itemRow[6], value);
        this.test.assertEquals(this.itemRow[7], value / this.itemRow[1]);
    }

    have_saturated_fat_as(value){
        this.test.assertEquals(this.itemRow[8], value);
        this.test.assertEquals(this.itemRow[9], value / this.itemRow[1]);
    }

    have_trans_fat_as(value){
        this.test.assertEquals(this.itemRow[10], value);
        this.test.assertEquals(this.itemRow[11], value / this.itemRow[1]);
    }

    have_carbohydrate_as(value){
        this.test.assertEquals(this.itemRow[12], value);
        this.test.assertEquals(this.itemRow[13], value / this.itemRow[1]);
    }

    have_fiber_as(value){
        this.test.assertEquals(this.itemRow[14], value);
        this.test.assertEquals(this.itemRow[15], value / this.itemRow[1]);
    }

    have_sugar_as(value){
        this.test.assertEquals(this.itemRow[16], value);
        this.test.assertEquals(this.itemRow[17], value / this.itemRow[1]);
    }

    have_sugar_alcohol_as(value){
        this.test.assertEquals(this.itemRow[18], value);
        this.test.assertEquals(this.itemRow[19], value / this.itemRow[1]);
    }

    have_protein_as(value){
        this.test.assertEquals(this.itemRow[20], value);
        this.test.assertEquals(this.itemRow[21], value / this.itemRow[1]);
    }

    have_sodium_as(value){
        this.test.assertEquals(this.itemRow[22], value);
        this.test.assertEquals(this.itemRow[23], value / this.itemRow[1]);
    }

    have_noom_colour_of(colour){
        this.test.assertEquals(this.itemRow[24], colour);
    }
}