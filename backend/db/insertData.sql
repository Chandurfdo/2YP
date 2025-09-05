-- ==============================
-- ZONE
-- ==============================
INSERT INTO Zone (zone_name) VALUES ('North Wing');
INSERT INTO Zone (zone_name) VALUES ('South Wing');
INSERT INTO Zone (zone_name) VALUES ('East Wing');
INSERT INTO Zone (zone_name) VALUES ('West Wing');
INSERT INTO Zone (zone_name) VALUES ('Central Plaza');

-- ==============================
-- BUILDING
-- ==============================
INSERT INTO Building (zone_ID, building_name, description) 
VALUES (1, 'Innovation Hall', 'Main hall for tech exhibitions');
INSERT INTO Building (zone_ID, building_name, description) 
VALUES (2, 'Science Pavilion', 'Dedicated to science exhibits');
INSERT INTO Building (zone_ID, building_name, description) 
VALUES (3, 'Arts Gallery', 'Showcase of art and creativity');
INSERT INTO Building (zone_ID, building_name, description) 
VALUES (4, 'Startup Hub', 'Startup booths and demos');
INSERT INTO Building (zone_ID, building_name, description) 
VALUES (5, 'Main Auditorium', 'Large stage for keynote events');

-- ==============================
-- EXHIBITS
-- ==============================
INSERT INTO Exhibits (exhibit_name, building_ID) VALUES ('AI Robot Showcase', 1);
INSERT INTO Exhibits (exhibit_name, building_ID) VALUES ('Space Exploration Models', 2);
INSERT INTO Exhibits (exhibit_name, building_ID) VALUES ('Modern Art Collection', 3);
INSERT INTO Exhibits (exhibit_name, building_ID) VALUES ('Startup Innovations', 4);
INSERT INTO Exhibits (exhibit_name, building_ID) VALUES ('Cultural Heritage Display', 5);

-- ==============================
-- ORGANIZER
-- ==============================
INSERT INTO Organizer (organizer_name, Fname, Lname, email, contact_no) 
VALUES ('TechOrg', 'John', 'Doe', 'john.doe@example.com', '0711234567');
INSERT INTO Organizer (organizer_name, Fname, Lname, email, contact_no) 
VALUES ('SciTeam', 'Alice', 'Smith', 'alice.smith@example.com', '0729876543');
INSERT INTO Organizer (organizer_name, Fname, Lname, email, contact_no) 
VALUES ('ArtCrew', 'Bob', 'Brown', 'bob.brown@example.com', '0773456789');
INSERT INTO Organizer (organizer_name, Fname, Lname, email, contact_no) 
VALUES ('StartupHub', 'Clara', 'White', 'clara.white@example.com', '0752223334');
INSERT INTO Organizer (organizer_name, Fname, Lname, email, contact_no) 
VALUES ('ExpoMain', 'David', 'Lee', 'david.lee@example.com', '0785556667');

-- ==============================
-- EVENTS
-- ==============================
INSERT INTO Events (event_name, start_time, end_time, location, description, media_urls, event_category, organizer_ID)
VALUES ('AI Seminar', '2025-09-10 10:00:00', '2025-09-10 12:00:00', 'Innovation Hall', 'Seminar on Artificial Intelligence', 'http://example.com/media/ai', 'Technology', 1);
INSERT INTO Events (event_name, start_time, end_time, location, description, media_urls, event_category, organizer_ID)
VALUES ('Space Talk', '2025-09-11 14:00:00', '2025-09-11 16:00:00', 'Science Pavilion', 'Discussion on space exploration', 'http://example.com/media/space', 'Science', 2);
INSERT INTO Events (event_name, start_time, end_time, location, description, media_urls, event_category, organizer_ID)
VALUES ('Art Showcase', '2025-09-12 09:00:00', '2025-09-12 11:00:00', 'Arts Gallery', 'Presentation of modern art', 'http://example.com/media/art', 'Arts', 3);
INSERT INTO Events (event_name, start_time, end_time, location, description, media_urls, event_category, organizer_ID)
VALUES ('Startup Pitch', '2025-09-13 15:00:00', '2025-09-13 17:00:00', 'Startup Hub', 'Pitching session for startups', 'http://example.com/media/startup', 'Business', 4);
INSERT INTO Events (event_name, start_time, end_time, location, description, media_urls, event_category, organizer_ID)
VALUES ('Cultural Night', '2025-09-14 18:00:00', '2025-09-14 20:00:00', 'Main Auditorium', 'Cultural heritage performances', 'http://example.com/media/culture', 'Culture', 5);

-- ==============================
-- ADMIN
-- ==============================
INSERT INTO Admin (user_name, email) VALUES ('admin1', 'admin1@example.com');
INSERT INTO Admin (user_name, email) VALUES ('admin2', 'admin2@example.com');
INSERT INTO Admin (user_name, email) VALUES ('admin3', 'admin3@example.com');
INSERT INTO Admin (user_name, email) VALUES ('admin4', 'admin4@example.com');
INSERT INTO Admin (user_name, email) VALUES ('admin5', 'admin5@example.com');

-- ==============================
-- SPEAKER
-- ==============================
INSERT INTO Speaker (speaker_name, email) VALUES ('Dr. Alice', 'alice@example.com');
INSERT INTO Speaker (speaker_name, email) VALUES ('Prof. Bob', 'bob@example.com');
INSERT INTO Speaker (speaker_name, email) VALUES ('Dr. Carol', 'carol@example.com');
INSERT INTO Speaker (speaker_name, email) VALUES ('Mr. Daniel', 'daniel@example.com');
INSERT INTO Speaker (speaker_name, email) VALUES ('Ms. Eva', 'eva@example.com');

-- Event_Speaker (Many-to-Many)
INSERT INTO Event_Speaker (event_ID, speaker_ID) VALUES (1, 1);
INSERT INTO Event_Speaker (event_ID, speaker_ID) VALUES (1, 2);
INSERT INTO Event_Speaker (event_ID, speaker_ID) VALUES (2, 3);
INSERT INTO Event_Speaker (event_ID, speaker_ID) VALUES (3, 4);
INSERT INTO Event_Speaker (event_ID, speaker_ID) VALUES (4, 5);

-- ==============================
-- TAG
-- ==============================
INSERT INTO Tag (tag_name) VALUES ('AI');
INSERT INTO Tag (tag_name) VALUES ('Robotics');
INSERT INTO Tag (tag_name) VALUES ('Space');
INSERT INTO Tag (tag_name) VALUES ('Art');
INSERT INTO Tag (tag_name) VALUES ('Culture');

-- Event_Tag (Many-to-Many)
INSERT INTO Event_Tag (event_ID, tag_ID) VALUES (1, 1);
INSERT INTO Event_Tag (event_ID, tag_ID) VALUES (1, 2);
INSERT INTO Event_Tag (event_ID, tag_ID) VALUES (2, 3);
INSERT INTO Event_Tag (event_ID, tag_ID) VALUES (3, 4);
INSERT INTO Event_Tag (event_ID, tag_ID) VALUES (5, 5);
