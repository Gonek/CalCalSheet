class NewItemScenarios extends AcceptanceTestBase{

    constructor(){
      super(NewItemGivenSteps, NewItemWhenSteps, NewItemThenSteps);
    }

    clearData(){
      testData.clearItems();
    }

    scenario_add_100g_item(){
        this.scenario('Add new 100g > 100g Item using the "New item form"')
          .given()
            .item_name_as("100g item").and()
            .serving_as_100g().and()
            .calories_as(95).and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("100g item").and()
            .have_serving_as(100, 'g', 1).and()
            .have_calories_as(95).and()
            .have_basic_macros().and()
            .have_noom_colour_of('Green').and()
            .have_auto_delete_at_empty().and()
            .form_is_clear();
    }

    scenario_add_1_serving_item(){
        this.scenario('Add new 1 serving > 1 serving Item using the "New item form"')
          .given()
            .item_name_as("1 piece item").and()
            .serving_as_1_piece().and()
            .calories_as(100).and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("1 piece item").and()
            .have_serving_as(1, 'piece', 25).and()
            .have_calories_as(100).and()
            .have_basic_macros().and()
            .have_noom_colour_of('Red').and()
            .have_auto_delete_at_empty().and()
            .form_is_clear();
    }

    scenario_add_100g_to_1_serving_item(){
        this.scenario('Add new 100g > 100g Item using the "New item form"')
          .given()
            .item_name_as("100g to 1 bowl item").and()
            .serving_as_100g().and()
            .calories_as(200).and()
            .all_basic_macros().and()
            .new_serving_as_1_bowl()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("100g to 1 bowl item").and()
            .have_serving_as(1, 'bowl', 150).and()
            .have_calories_as(300).and()
            .have_total_fat_as(15).and()
            .have_saturated_fat_as(16.5).and()
            .have_trans_fat_as(18).and()
            .have_carbohydrate_as(19.5).and()
            .have_fiber_as(21).and()
            .have_sugar_as(22.5).and()
            .have_sugar_alcohol_as(24).and()
            .have_protein_as(25.5).and()
            .have_sodium_as(27).and()
            .have_noom_colour_of('Yellow').and()
            .have_auto_delete_at_empty().and()
            .form_is_clear();
    }

    scenario_add_serving_to_another_serving_item(){
        this.scenario('Add new 1 serving > 1 other serving Item using the "New item form"')
          .given()
            .item_name_as("1 piece to 1 bowl item").and()
            .serving_as_1_piece().and()
            .calories_as(100).and()
            .all_basic_macros().and()
            .new_serving_as_1_bowl()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("1 piece to 1 bowl item").and()
            .have_serving_as(1, 'bowl', 150).and()
            .have_calories_as(600).and()
            .have_total_fat_as(60).and()
            .have_saturated_fat_as(66).and()
            .have_trans_fat_as(72).and()
            .have_carbohydrate_as(78).and()
            .have_fiber_as(84).and()
            .have_sugar_as(90).and()
            .have_sugar_alcohol_as(96).and()
            .have_protein_as(102).and()
            .have_sodium_as(108).and()
            .have_noom_colour_of('Red').and()
            .have_auto_delete_at_empty().and()
            .form_is_clear();
    }

    scenario_add_serving_to_100g_item(){
        this.scenario('Add new 1 serving > 1 other serving Item using the "New item form"')
          .given()
            .item_name_as("1 piece to 100g item").and()
            .serving_as(25, 'g', 25).and()
            .calories_as(100).and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("1 piece to 100g item").and()
            .have_serving_as(25, 'g', 1).and()
            .have_calories_as(100).and()
            .have_basic_macros().and()
            .have_noom_colour_of('Red').and()
            .have_auto_delete_at_empty().and()
            .form_is_clear();
    }

    scenario_add_100ml_to_100g_item(){
        this.scenario('Add new 1 serving > 1 other serving Item using the "New item form"')
          .given()
            .item_name_as("1 piece to 100g item").and()
            .serving_as(104, 'ml', 100).and()
            .calories_as(100).and()
            .all_basic_macros().and()
            .new_serving_as_1g()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("1 piece to 100g item").and()
            .have_serving_as(1, 'g', 1).and()
            .have_calories_as(1).and()
            .have_total_fat_as(0.1).and()
            .have_saturated_fat_as(0.1).and()
            .have_trans_fat_as(0.1).and()
            .have_carbohydrate_as(0.1).and()
            .have_fiber_as(0.1).and()
            .have_sugar_as(0.2).and()
            .have_sugar_alcohol_as(0.2).and()
            .have_protein_as(0.2).and()
            .have_sodium_as(0).and()
            .have_noom_colour_of('Green').and()
            .have_auto_delete_at_empty().and()
            .form_is_clear();
    }

    scenario_add_100g_item_with_400_water(){
        this.scenario('Add new 100g Item with 400g additinal water using the "New item form"')
          .given()
            .item_name_as("100g + 400g water item").and()
            .serving_as_100g().and()
            .calories_as(100).and()
            .additinal_water_of(400).and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("100g + 400g water item").and()
            .have_serving_as(100, 'g', 1).and()
            .have_calories_as(20).and()
            .have_total_fat_as(2).and()
            .have_saturated_fat_as(2.2).and()
            .have_trans_fat_as(2.4).and()
            .have_carbohydrate_as(2.6).and()
            .have_fiber_as(2.8).and()
            .have_sugar_as(3.0).and()
            .have_sugar_alcohol_as(3.2).and()
            .have_protein_as(3.4).and()
            .have_sodium_as(4).and()
            .have_price_as(19, 0.05).and()
            .have_noom_colour_of('Green').and()
            .have_auto_delete_at_empty().and()
            .form_is_clear();
    }

    scenario_add_item_with_1_day_auto_delete(){
        this.scenario('Add new item using the "New item form" with Auto delete at set to 1 day')
          .given()
            .item_name_as("1 day auto delete item").and()
            .serving_as_100g().and()
            .calories_as(109).and()
            .all_basic_macros().and()
            .auto_delete_at_as('1 Day')
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("1 day auto delete item").and()
            .have_auto_delete_at_as(getRelativeDay(+1));
    }

    scenario_add_item_with_1_week_auto_delete(){
        this.scenario('Add new item using the "New item form" with Auto delete at set to 1 week')
          .given()
            .item_name_as("1 week auto delete item").and()
            .serving_as_100g().and()
            .calories_as(99).and()
            .all_basic_macros().and()
            .auto_delete_at_as('1 Week')
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("1 week auto delete item").and()
            .have_auto_delete_at_as(getRelativeDay(+7));
    }

    scenario_add_solid_green_item(){
        this.scenario('Add new Green solid Item using the "New item form"')
          .given()
            .item_name_as("Green item").and()
            .serving_as_100g().and()
            .calories_as(95).and()
            .noom_category_as('Solid').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Green item").and()
            .have_noom_colour_of('Green');
    }

    scenario_add_solid_yellow_item(){
        this.scenario('Add new Yellow solid Item using the "New item form"')
          .given()
            .item_name_as("Yellow item").and()
            .serving_as_100g().and()
            .calories_as(101).and()
            .noom_category_as('Solid').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Yellow item").and()
            .have_noom_colour_of('Yellow');
    }

    scenario_add_solid_red_item(){
        this.scenario('Add new Red solid Item using the "New item form"')
          .given()
            .item_name_as("Red item").and()
            .serving_as_100g().and()
            .calories_as(241).and()
            .noom_category_as('Solid').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Red item").and()
            .have_noom_colour_of('Red');
    }
  
    scenario_add_liquid_green_item(){
        this.scenario('Add new Green liquid Item using the "New item form"')
          .given()
            .item_name_as("Green item").and()
            .serving_as_100g().and()
            .calories_as(30).and()
            .noom_category_as('Liquid').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Green item").and()
            .have_noom_colour_of('Green');
    }

    scenario_add_liquid_yellow_item(){
        this.scenario('Add new Yellow liquid Item using the "New item form"')
          .given()
            .item_name_as("Yellow item").and()
            .serving_as_100g().and()
            .calories_as(45).and()
            .noom_category_as('Liquid').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Yellow item").and()
            .have_noom_colour_of('Yellow');
    }

    scenario_add_liquid_red_item(){
        this.scenario('Add new Red liquid Item using the "New item form"')
          .given()
            .item_name_as("Red item").and()
            .serving_as_100g().and()
            .calories_as(52).and()
            .noom_category_as('Liquid').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Red item").and()
            .have_noom_colour_of('Red');
    }

    scenario_add_soup_green_item(){
        this.scenario('Add new Green soup Item using the "New item form"')
          .given()
            .item_name_as("Green item").and()
            .serving_as_100g().and()
            .calories_as(49).and()
            .noom_category_as('Soup').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Green item").and()
            .have_noom_colour_of('Green');
    }

    scenario_add_soup_yellow_item(){
        this.scenario('Add new Yellow soup Item using the "New item form"')
          .given()
            .item_name_as("Yellow item").and()
            .serving_as_100g().and()
            .calories_as(52).and()
            .noom_category_as('Soup').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Yellow item").and()
            .have_noom_colour_of('Yellow');
    }

    scenario_add_soup_red_item(){
        this.scenario('Add new Red soup Item using the "New item form"')
          .given()
            .item_name_as("Red item").and()
            .serving_as_100g().and()
            .calories_as(101).and()
            .noom_category_as('Soup').and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Red item").and()
            .have_noom_colour_of('Red');
    }

    scenario_add_green_but_overwrite_it_to_red_item(){
        this.scenario('Add new Green Item but overwriteing it to red using the "New item form"')
          .given()
            .item_name_as("Not green item").and()
            .serving_as_100g().and()
            .calories_as(90).and()
            .all_basic_macros().and()
            .noom_colour_as('Red')
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Not green item").and()
            .have_noom_colour_of('Red');
    }

    scenario_load_modify_and_replace_item(){
        this.scenario('Load, Modify and replace one item using the "New item form"')
          .given()
            .test_items_available()
          .when()
            .item_name_set_to("Test 100g")
          .then()
            .item_loaded_to_form_as(['Test 100g', 100, 'g', 100, 370, 10, 5, 5, 30, 40, 5, 1, 20, 100, 10, 100])
          .given()
            .serving_as_100g().and()
            .calories_as(95).and()
            .all_basic_macros()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name("Test 100g").and()
            .there_is_only_one_item_saved_with_this_name().and()
            .have_serving_as(100, 'g', 1).and()
            .have_calories_as(95).and()
            .have_basic_macros().and()
            .have_noom_colour_of('Green').and()
            .form_is_clear();
        }

    scenario_delete_one_item(){
      this.scenario('Delete Items on "New item form" to delete one selected item')
        .given()
          .test_items_available().and()
          .delete_items_as('Green')
        .when()
          .delete_items_clicked()
        .then()
          .no_items_exist_with_name('Green');
    }

    scenario_delete_multiple_items(){
      this.scenario('Delete Items on "New item form" to delete multiple selected items')
        .given()
          .test_items_available().and()
          .delete_items_as('Green, Red, Yellow')
        .when()
          .delete_items_clicked()
        .then()
          .no_items_exist_with_name('Green').and()
          .no_items_exist_with_name('Red').and()
          .no_items_exist_with_name('Yellow');
    }

    scenario_delete_items_when_no_item_selected(){
      this.scenario('Try to delete Items on "New item form" but no item is selected')
        .given()
          .test_items_available().and()
          .delete_items_as('')
        .when()
          .delete_items_clicked()
        .then()
          .number_of_items_are(14);
    }
}

var runNewItemScenarios = () => new NewItemScenarios().runAllTests();
