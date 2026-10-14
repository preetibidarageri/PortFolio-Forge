type ProfileType =
  | "student"
  | "fresher"
  | "experienced"
  | "freelancer"
  | "researcher";

const profileTypes: ProfileType[] = [
  "student",
  "fresher",
  "experienced",
  "freelancer",
  "researcher",
];

function ProfileType() {
  return (
    <div>
      <h1>What describes you?</h1>

      <p>
        Choose your profile type to get a personalized portfolio experience.
      </p>

      {profileTypes.map((type) => (
        <button key={type}>{type}</button>
      ))}
    </div>
  );
}

export default ProfileType;
