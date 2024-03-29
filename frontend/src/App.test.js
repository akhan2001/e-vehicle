import { render, screen } from '@testing-library/react';
import updatePosts from './utils/updatePosts';
import PieChart from './components/PieChart';
import Posts from './components/Posts';

test('post array correctly updated with function "update posts"', async () => {
  let testData = [
    {"_id":"640b90ae34a097877f0f63cd","title":"I created an EV \"Range Value\" spreadsheet to see how currently available EVs stack up against each other.","link":"/r/electricvehicles/comments/11ncxpn/i_created_an_ev_range_value_spreadsheet_to_see/","numUpvotes":692,"datePosted":"2023-03-10T03:10:25.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63ce","title":"Ariya vs Leaf","link":"/r/electricvehicles/comments/11n7zds/ariya_vs_leaf/","numUpvotes":105,"datePosted":"2023-03-09T23:43:09.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63cf","title":"Alfa Romeo Will Make a Three-Row, 400-Mile Electric SUV for the US","link":"/r/electricvehicles/comments/11nt0ic/alfa_romeo_will_make_a_threerow_400mile_electric/","numUpvotes":89,"datePosted":"2023-03-10T16:02:48.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d0","title":"Airstream and Porsche unveil camping trailer concept for EVs","link":"/r/electricvehicles/comments/11n98u6/airstream_and_porsche_unveil_camping_trailer/","numUpvotes":75,"datePosted":"2023-03-10T00:33:27.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d1","title":"First e-Sprinter in North America at the NTEA Work Truck Week in Indianapolis","link":"/r/electricvehicles/comments/11nghgy/first_esprinter_in_north_america_at_the_ntea_work/","numUpvotes":73,"datePosted":"2023-03-10T05:58:41.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d2","title":"Lamborghini Urus Replacement Confirmed for 2029, Will Be Fully Electric","link":"/r/electricvehicles/comments/11njy92/lamborghini_urus_replacement_confirmed_for_2029/","numUpvotes":63,"datePosted":"2023-03-10T09:04:31.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d3","title":"VW EVs To Have Interiors With More Recycled Bottles, Marine Debris | The company's ID family will get innovations introduced with the ID. Buzz.","link":"/r/electricvehicles/comments/11noibf/vw_evs_to_have_interiors_with_more_recycled/","numUpvotes":45,"datePosted":"2023-03-10T12:57:24.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d4","title":"B.C. man says he accidentally unlocked and drove someone else’s Tesla using the app","link":"/r/electricvehicles/comments/11nhj6r/bc_man_says_he_accidentally_unlocked_and_drove/","numUpvotes":40,"datePosted":"2023-03-10T06:50:42.000Z","source":"Twitter"},
    {"_id":"640b90ae34a097877f0f63d5","title":"LGES And Honda Break Ground For New EV Battery JV In Ohio","link":"/r/electricvehicles/comments/11n56o1/lges_and_honda_break_ground_for_new_ev_battery_jv/","numUpvotes":35,"datePosted":"2023-03-09T21:58:37.000Z","source":"Twitter"},
    {"_id":"640b90ae34a097877f0f63d6","title":"EVgo Inc. Aligns Organization Around Growing Its Charging Network","link":"/r/electricvehicles/comments/11ncfex/evgo_inc_aligns_organization_around_growing_its/","numUpvotes":29,"datePosted":"2023-03-10T02:48:40.000Z","source":"Twitter"}];

  expect(updatePosts(testData, 5, "Both").length).toBe(5); 
  expect(updatePosts(testData, 10, "Reddit").length).toBe(7); 
  expect(updatePosts(testData, 10, "Twitter").length).toBe(3); 
});

test('Posts are displaying properly', async () => {
  let testData = [
    {"_id":"640b90ae34a097877f0f63cd","title":"I created an EV \"Range Value\" spreadsheet to see how currently available EVs stack up against each other.","link":"/r/electricvehicles/comments/11ncxpn/i_created_an_ev_range_value_spreadsheet_to_see/","numUpvotes":692,"datePosted":"2023-03-10T03:10:25.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63ce","title":"Ariya vs Leaf","link":"/r/electricvehicles/comments/11n7zds/ariya_vs_leaf/","numUpvotes":105,"datePosted":"2023-03-09T23:43:09.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63cf","title":"Alfa Romeo Will Make a Three-Row, 400-Mile Electric SUV for the US","link":"/r/electricvehicles/comments/11nt0ic/alfa_romeo_will_make_a_threerow_400mile_electric/","numUpvotes":89,"datePosted":"2023-03-10T16:02:48.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d0","title":"Airstream and Porsche unveil camping trailer concept for EVs","link":"/r/electricvehicles/comments/11n98u6/airstream_and_porsche_unveil_camping_trailer/","numUpvotes":75,"datePosted":"2023-03-10T00:33:27.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d1","title":"First e-Sprinter in North America at the NTEA Work Truck Week in Indianapolis","link":"/r/electricvehicles/comments/11nghgy/first_esprinter_in_north_america_at_the_ntea_work/","numUpvotes":73,"datePosted":"2023-03-10T05:58:41.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d2","title":"Lamborghini Urus Replacement Confirmed for 2029, Will Be Fully Electric","link":"/r/electricvehicles/comments/11njy92/lamborghini_urus_replacement_confirmed_for_2029/","numUpvotes":63,"datePosted":"2023-03-10T09:04:31.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d3","title":"VW EVs To Have Interiors With More Recycled Bottles, Marine Debris | The company's ID family will get innovations introduced with the ID. Buzz.","link":"/r/electricvehicles/comments/11noibf/vw_evs_to_have_interiors_with_more_recycled/","numUpvotes":45,"datePosted":"2023-03-10T12:57:24.000Z","source":"Reddit"},
    {"_id":"640b90ae34a097877f0f63d4","title":"B.C. man says he accidentally unlocked and drove someone else’s Tesla using the app","link":"/r/electricvehicles/comments/11nhj6r/bc_man_says_he_accidentally_unlocked_and_drove/","numUpvotes":40,"datePosted":"2023-03-10T06:50:42.000Z","source":"Twitter"},
    {"_id":"640b90ae34a097877f0f63d5","title":"LGES And Honda Break Ground For New EV Battery JV In Ohio","link":"/r/electricvehicles/comments/11n56o1/lges_and_honda_break_ground_for_new_ev_battery_jv/","numUpvotes":35,"datePosted":"2023-03-09T21:58:37.000Z","source":"Twitter"},
    {"_id":"640b90ae34a097877f0f63d6","title":"EVgo Inc. Aligns Organization Around Growing Its Charging Network","link":"/r/electricvehicles/comments/11ncfex/evgo_inc_aligns_organization_around_growing_its/","numUpvotes":29,"datePosted":"2023-03-10T02:48:40.000Z","source":"Twitter"}];
  render(
    <Posts posts= {testData}/>
  );
  let elements = screen.getAllByTestId('testr');
  for (var i = 0; i < elements.length; i++) {
    expect(elements[i]).not.toBe("");
    expect(elements[i]).not.toBe(undefined);
  }
  elements = screen.getAllByTestId('testt');
  for (var i = 0; i < elements.length; i++) {
    expect(elements[i]).not.toBe("");
    expect(elements[i]).not.toBe(undefined);
  }
});

jest.mock('react-chartjs-2', () => ({
  Pie: () => <chart>working</chart>
}));

test('Pie charts are displaying properly', async () => {
  let testData = [
    {"_id":"640b90ae34a097877f0f63cd","title":"I created an EV \"Range Value\" spreadsheet to see how currently available EVs stack up against each other.","link":"/r/electricvehicles/comments/11ncxpn/i_created_an_ev_range_value_spreadsheet_to_see/","numUpvotes":692,"datePosted":"2023-03-10T03:10:25.000Z","source":"Reddit","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63ce","title":"Ariya vs Leaf","link":"/r/electricvehicles/comments/11n7zds/ariya_vs_leaf/","numUpvotes":105,"datePosted":"2023-03-09T23:43:09.000Z","source":"Reddit","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63cf","title":"Alfa Romeo Will Make a Three-Row, 400-Mile Electric SUV for the US","link":"/r/electricvehicles/comments/11nt0ic/alfa_romeo_will_make_a_threerow_400mile_electric/","numUpvotes":89,"datePosted":"2023-03-10T16:02:48.000Z","source":"Reddit","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63d0","title":"Airstream and Porsche unveil camping trailer concept for EVs","link":"/r/electricvehicles/comments/11n98u6/airstream_and_porsche_unveil_camping_trailer/","numUpvotes":75,"datePosted":"2023-03-10T00:33:27.000Z","source":"Reddit","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63d1","title":"First e-Sprinter in North America at the NTEA Work Truck Week in Indianapolis","link":"/r/electricvehicles/comments/11nghgy/first_esprinter_in_north_america_at_the_ntea_work/","numUpvotes":73,"datePosted":"2023-03-10T05:58:41.000Z","source":"Reddit","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63d2","title":"Lamborghini Urus Replacement Confirmed for 2029, Will Be Fully Electric","link":"/r/electricvehicles/comments/11njy92/lamborghini_urus_replacement_confirmed_for_2029/","numUpvotes":63,"datePosted":"2023-03-10T09:04:31.000Z","source":"Reddit","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63d3","title":"VW EVs To Have Interiors With More Recycled Bottles, Marine Debris | The company's ID family will get innovations introduced with the ID. Buzz.","link":"/r/electricvehicles/comments/11noibf/vw_evs_to_have_interiors_with_more_recycled/","numUpvotes":45,"datePosted":"2023-03-10T12:57:24.000Z","source":"Reddit","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63d4","title":"B.C. man says he accidentally unlocked and drove someone else’s Tesla using the app","link":"/r/electricvehicles/comments/11nhj6r/bc_man_says_he_accidentally_unlocked_and_drove/","numUpvotes":40,"datePosted":"2023-03-10T06:50:42.000Z","source":"Twitter","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63d5","title":"LGES And Honda Break Ground For New EV Battery JV In Ohio","link":"/r/electricvehicles/comments/11n56o1/lges_and_honda_break_ground_for_new_ev_battery_jv/","numUpvotes":35,"datePosted":"2023-03-09T21:58:37.000Z","source":"Twitter","sentiment":"0"},
    {"_id":"640b90ae34a097877f0f63d6","title":"EVgo Inc. Aligns Organization Around Growing Its Charging Network","link":"/r/electricvehicles/comments/11ncfex/evgo_inc_aligns_organization_around_growing_its/","numUpvotes":29,"datePosted":"2023-03-10T02:48:40.000Z","source":"Twitter","sentiment":"0"}];
  render(
    <PieChart posts={testData} title={"Post Sentiment"}/>
  );
  let element = screen.getByText('working');
  expect(element).not.toBe(undefined);
});
