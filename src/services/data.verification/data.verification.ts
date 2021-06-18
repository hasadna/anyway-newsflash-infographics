import { IPoint } from '../../models/Point';

const mostExtremeLongitude = 36;
const mostExtremeLatitude = 29;
const validCoords = (coords: any) => coords < mostExtremeLongitude && coords > mostExtremeLatitude;
const validNumber = (value: any) => typeof value === 'number' && value >= 0;
const validString = (value: any) => typeof value === 'string';

export const verifiedWidgetData = (widget: any) => {
  const {
    name,
    data: { items },
  } = widget;
  let isValid;

  switch (name) {
    case 'accidents_heat_map': {
      const validData = items.map((item: IPoint) => validCoords(item.latitude) && validCoords(item.longitude));
      isValid = [validData] && items.length > 1;
      break;
    }
    case 'street_view': {
      //temporary till fixing widget
      // isValid = validCoords(items.latitude) && validCoords(items.longitude);
      break;
    }
    case 'most_severe_accidents': {
      [isValid] = items.map(
        (item: any) =>
          validCoords(item.latitude) &&
          validCoords(item.longitude) &&
          validString(item.accident_severity) &&
          validString(item.accident_timestamp) &&
          validString(item.accident_type),
      );
      break;
    }
    case 'accident_count_by_severity': {
      isValid =
        validNumber(items.end_year) &&
        validNumber(items.severity_fatal_count) &&
        validNumber(items.severity_light_count) &&
        validNumber(items.severity_severe_count) &&
        validNumber(items.start_year) &&
        validNumber(items.total_accidents_count);
      break;
    }
    case 'most_severe_accidents_table': {
      [isValid] = items.map(
        (item: any) =>
          validString(item.accident_severity) &&
          validNumber(item.accident_year) &&
          validString(item.date) &&
          validString(item.hour) &&
          validNumber(item.injured_count) &&
          validNumber(item.killed_count) &&
          validNumber(item.light_injured_count) &&
          validNumber(item.severe_injured_count) &&
          validString(item.type),
      );
      break;
    }
    case 'head_on_collisions_comparison': {
      [isValid] =
        items.all_roads_fatal_accidents.map((item: any) => validString(item.desc) && validNumber(item.count)) ||
        items.specific_road_segment_fatal_accidents.map(
          (item: any) => validString(item.desc) && validNumber(item.count),
        );
      break;
    }
    case 'accident_count_by_accident_type': {
      [isValid] = items.map((item: any) => validString(item.accident_type) && validNumber(item.count));
      break;
    }
    case 'accident_count_by_accident_year': {
      [isValid] = items.map((item: any) => validNumber(item.accident_year) && validNumber(item.count));
      break;
    }
    case 'injured_count_by_accident_year': {
      [isValid] = items.map((item: any) => validNumber(item.accident_year) && validNumber(item.count));
      break;
    }
    case 'accident_count_by_day_night': {
      [isValid] = items.map((item: any) => validString(item.day_night) && validNumber(item.count));
      break;
    }
    case 'accident_count_by_hour': {
      [isValid] = items.map((item: any) => validNumber(item.accident_hour) && validNumber(item.count));
      break;
    }
    case 'accident_count_by_road_light': {
      [isValid] = items.map((item: any) => validString(item.road_light) && validNumber(item.count));
      break;
    }
    case 'accident_count_by_driver_type': {
      [isValid] = items.map((item: any) => validString(item.driver_type) && validNumber(item.count));
      break;
    }
    case 'accident_count_by_car_type': {
      [isValid] = items.map(
        (item: any) =>
          validString(item.car_type) && validNumber(item.percentage_country) && validNumber(item.percentage_segment),
      );
      break;
    }
    case 'top_road_segments_accidents': {
      //temporary till fixing property in backend
      [isValid] = items.map((item: any) => validString(item['segment name']) && validNumber(item.count));
      break;
    }
    case 'pedestrian_injured_in_junctions': {
      //temporary till fixing property in backend
      [isValid] = items.map((item: any) => validString(item['street name']) && validNumber(item.count));
      break;
    }
    case 'injured_accidents_with_pedestrians': {
      [isValid] = items.map(
        (item: any) =>
          validNumber(item.killed_injury_severity_count) &&
          validString(item.killed_injury_severity_text) &&
          validNumber(item.light_injury_severity_count) &&
          validString(item.light_injury_severity_text) &&
          validNumber(item.severe_injury_severity_count) &&
          validString(item.severe_injury_severity_text) &&
          validNumber(item.year),
      );
      break;
    }
    case 'accident_severity_by_cross_location': {
      [isValid] = items.map(
        (item: any) =>
          validString(item.cross_location_text) &&
          validNumber(item.killed_injury_severity_count) &&
          validString(item.killed_injury_severity_text) &&
          validNumber(item.light_injury_severity_count) &&
          validString(item.light_injury_severity_text) &&
          validNumber(item.severe_injury_severity_count) &&
          validString(item.severe_injury_severity_text),
      );
      break;
    }
    default: {
      isValid = false;
    }
  }

  return isValid;
};
