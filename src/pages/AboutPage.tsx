import { SignalEyes } from "../components/SignalEyes";
import { FrankenFigsBadge } from "../components/FrankenFigsBadge";
import { ResumeDetails } from "../components/ResumeDetails";
import { profile } from "../content/profile";

export function AboutPage() {
  return (
    <div className="page page-about">
      <section className="page-heading" aria-labelledby="about-title">
        <div className="page-heading__copy">
          <span className="eyebrow">Profile</span>
          <h1 id="about-title">关于 AmierHan</h1>
        </div>
        <FrankenFigsBadge />
      </section>
      <section className="about-layout about-layout--resume">
        <article className="about-panel about-panel--identity">
          <SignalEyes />
          <img src={profile.avatarUrl} alt={`${profile.name} 个人头像`} />
          <div className="contact-block">
            <span className="utility-label">Contact</span>
            {profile.contacts.map((contact) => <a key={contact.label} href={contact.href} target={contact.label === "Web" ? "_blank" : undefined} rel={contact.label === "Web" ? "noopener noreferrer" : undefined}><small>{contact.label}</small><strong>{contact.value}</strong></a>)}
          </div>
        </article>
        <ResumeDetails />
      </section>
    </div>
  );
}
