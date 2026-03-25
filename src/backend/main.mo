import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
    company : Text;
  };

  type Submission = {
    name : Text;
    email : Text;
    projectType : Text;
    budget : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type PortfolioItem = {
    id : Nat;
    title : Text;
    category : Text;
    description : Text;
    servicesUsed : [Text];
    imageUrl : Storage.ExternalBlob;
    createdAt : Time.Time;
  };

  type Testimonial = {
    id : Nat;
    author : Text;
    role : Text;
    company : Text;
    text : Text;
    rating : Nat;
    createdAt : Time.Time;
  };

  type TeamMember = {
    id : Nat;
    name : Text;
    role : Text;
    bio : Text;
    imageUrl : Storage.ExternalBlob;
    displayOrder : Nat;
  };

  type Service = {
    id : Nat;
    title : Text;
    category : Text;
    description : Text;
    iconName : Text;
    displayOrder : Nat;
  };

  var nextId = 1;

  func getNextId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  let submissions = Map.empty<Nat, Submission>();
  let portfolioItems = Map.empty<Nat, PortfolioItem>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let teamMembers = Map.empty<Nat, TeamMember>();
  let services = Map.empty<Nat, Service>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func submitForm(submission : Submission) : async () {
    let id = getNextId();
    let newSubmission = { submission with id };
    submissions.add(id, newSubmission);
  };

  public shared ({ caller }) func addPortfolioItem(item : PortfolioItem) : async () {
    let id = getNextId();
    let newItem = { item with id };
    portfolioItems.add(id, newItem);
  };

  public query ({ caller }) func getAllPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray();
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray();
  };

  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    let id = getNextId();
    let newTestimonial = { testimonial with id };
    testimonials.add(id, newTestimonial);
  };

  public shared ({ caller }) func addTeamMember(member : TeamMember) : async () {
    let id = getNextId();
    let newMember = { member with id };
    teamMembers.add(id, newMember);
  };

  public shared ({ caller }) func addService(service : Service) : async () {
    let id = getNextId();
    let newService = { service with id };
    services.add(id, newService);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public query ({ caller }) func getPortfolioItem(id : Nat) : async ?PortfolioItem {
    portfolioItems.get(id);
  };

  public query ({ caller }) func getTestimonial(id : Nat) : async ?Testimonial {
    testimonials.get(id);
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public query ({ caller }) func getAllTeamMembers() : async [TeamMember] {
    teamMembers.values().toArray();
  };

  public query ({ caller }) func getTeamMember(id : Nat) : async ?TeamMember {
    teamMembers.get(id);
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  public query ({ caller }) func getService(id : Nat) : async ?Service {
    services.get(id);
  };

  public query ({ caller }) func getPortfolioItemsByCategory(category : Text) : async [PortfolioItem] {
    portfolioItems.values().toArray().filter(func(item) { item.category == category });
  };

  public query ({ caller }) func getTestimonialsByRating(minRating : Nat) : async [Testimonial] {
    testimonials.values().toArray().filter(func(testimonial) { testimonial.rating >= minRating });
  };
};

