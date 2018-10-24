const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017");

let Schema = mongoose.Schema;
var LeadSchema = new Schema({
  phone1: String,
  phone2: String,
  firstName: String,
  middleName: String,
  lastName: String,
  spouse: String,
  maritalStatus: String,
  readableAddress: String,
  addressMeta: [{
    last_line: String,
    metadata: {
      longitude: Number,
      record_type: String,
      zip_type: String,
      dst: Boolean,
      precision: String,
      elot_sort: String,
      time_zone: String,
      elot_sequence: String,
      congressional_district: String,
      county_fips: String,
      rdi: String,
      county_name: String,
      utc_offset: Number,
      carrier_route: String,
      latitude: Number
    },
    analysis: {
      dpv_footnotes: String,
      dpv_vacant: String,
      dpv_match_code: String,
      dpv_cmra: String,
      active: String

    },
    candidate_index: Boolean,
    delivery_point_barcode: String,
    delivery_line_1: String,
    components: {
      zipcode: String,
      delivery_point_check_digit: String,
      state_abbreviation: String,
      street_suffix: String,
      primary_number: String,
      street_name: String,
      delivery_point: String,
      city_name: String,
      plus4_code: String
    },
    input_index: Number
  }],
  addressVerified: Boolean,
  address: String,
  city: String,
  zipcode: String,
  unverifiedEmail: Boolean,
  email: String,
  program: String,
  programId: Number,
  participant: String,
  participantDisplayName: String,
  corporateWeek: String,
  promotion: String,
  promotionId: Number,
  dealerRep: String,
  age: String,
  income: String,
  RVOwner: String,
  picture: String,
  state: String,
  ingestionStatus: {
    type: String,
    default: 'WAITING'
  },
  filename: {
    type: String,
    required: true
  },
  hasSignature: Boolean,
  submissionID: String,
  submissionFile: {
    type: String,
    required: true
  },
  rejectMessage: String,
  personId: Number,
  accountId: Number,
  profileId: Number,
  entryPerson: String,
  winUser: String,
  entryEmail: String,
  lastHeldBy: String,
  resortName: String,
  resortId: Number,
  participantExists: Boolean,
  queueWeight: {
    type: Number,
    default: 1
  },
  assignedEmail: String,
  toWaitingReason: String,
  problems: String,
  CreatedByID: Number,
  Lock: Boolean
});

module.exports = mongoose.model('Lead', LeadSchema);
