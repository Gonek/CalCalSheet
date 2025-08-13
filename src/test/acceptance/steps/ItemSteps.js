class ItemThenSteps extends Steps{

    item_saved_with_name(name){
        this.name = name;
        this.itemRow = getSht(SHT.ITEMS).getValues('B4:AD').find(r => r[0] == name);
        assertTrue(this.itemRow);
    }

    no_items_exist_with_name(name){
        let itemFind = getSht(SHT.ITEMS).getValues('B4:D').find(r => r[0] == name);
        assertFalse(itemFind);
    }

    there_is_only_one_item_saved_with_this_name(){
       let itemRows = getSht(SHT.ITEMS).getValues('B4:AD').filter(r => r[0] == this.name);
       assertEquals(itemRows.length, 1);
    }

    number_of_items_are(count){
        let countSaved = clear(getSht(SHT.ITEMS).getValues('B4:B')).length;
        assertEquals(countSaved, count);
    }

    have_serving_as(amounth, unit, weight){
        assertEquals(this.itemRow[1], amounth);
        assertEquals(this.itemRow[2], unit);
        assertEquals(this.itemRow[3], weight);
    }

    have_calories_as(calories){
        assertEquals(this.itemRow[4], calories);
        assertEquals(this.itemRow[5], calories  / this.itemRow[1]);
    }

    have_basic_macros(){
        assertEquals(this.itemRow[6], 10);
        assertEquals(this.itemRow[7], 10 / this.itemRow[1]);
        assertEquals(this.itemRow[8], 11);
        assertEquals(this.itemRow[9], 11 / this.itemRow[1]);
        assertEquals(this.itemRow[10], 12);
        assertEquals(this.itemRow[11], 12 / this.itemRow[1]);
        assertEquals(this.itemRow[12], 13);
        assertEquals(this.itemRow[13], 13 / this.itemRow[1]);
        assertEquals(this.itemRow[14], 14);
        assertEquals(this.itemRow[15], 14 / this.itemRow[1]);
        assertEquals(this.itemRow[16], 15);
        assertEquals(this.itemRow[17], 15 / this.itemRow[1]);
        assertEquals(this.itemRow[18], 16);
        assertEquals(this.itemRow[19], 16 / this.itemRow[1]);
        assertEquals(this.itemRow[20], 17);
        assertEquals(this.itemRow[21], 17 / this.itemRow[1]);
        assertEquals(this.itemRow[22], 18);
        assertEquals(this.itemRow[23], 18 / this.itemRow[1]);
        assertEquals(this.itemRow[24], 19);
        assertEquals(this.itemRow[25], 0.95);
    }

    have_total_fat_as(value){
        assertEquals(this.itemRow[6], value);
        assertEquals(this.itemRow[7], value / this.itemRow[1]);
    }

    have_saturated_fat_as(value){
        assertEquals(this.itemRow[8], value);
        assertEquals(this.itemRow[9], value / this.itemRow[1]);
    }

    have_trans_fat_as(value){
        assertEquals(this.itemRow[10], value);
        assertEquals(this.itemRow[11], value / this.itemRow[1]);
    }

    have_carbohydrate_as(value){
        assertEquals(this.itemRow[12], value);
        assertEquals(this.itemRow[13], value / this.itemRow[1]);
    }

    have_fiber_as(value){
        assertEquals(this.itemRow[14], value);
        assertEquals(this.itemRow[15], value / this.itemRow[1]);
    }

    have_sugar_as(value){
        assertEquals(this.itemRow[16], value);
        assertEquals(this.itemRow[17], value / this.itemRow[1]);
    }

    have_sugar_alcohol_as(value){
        assertEquals(this.itemRow[18], value);
        assertEquals(this.itemRow[19], value / this.itemRow[1]);
    }

    have_protein_as(value){
        assertEquals(this.itemRow[20], value);
        assertEquals(this.itemRow[21], value / this.itemRow[1]);
    }

    have_sodium_as(value){
        assertEquals(this.itemRow[22], value);
        assertEquals(this.itemRow[23], value / this.itemRow[1]);
    }

    have_price_as(value, valuePerUnit){
        assertEquals(this.itemRow[24], value);
        assertEquals(this.itemRow[25], valuePerUnit);
    }

    have_noom_colour_of(colour){
        assertEquals(this.itemRow[26], colour);
    }

    have_auto_delete_at_as(autoDelete){
        assertEquals(this.itemRow[28], autoDelete);
    }

    have_auto_delete_at_empty(){
        assertEmpty(this.itemRow[28]);
    }
}