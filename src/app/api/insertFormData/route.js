import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const client = await pool.connect();
    try {
        const reqBody = await request.json();
        
        // Extract form data
        const { language, granthatype, granthadeck, author, location } = reqBody.form1;
        const { grantha } = reqBody.form2;
        const { granthalanguage, storagemechanism, physicalcondition, conservationhistory } = reqBody.form3;
        const { scanningproperties, scannedimage, digitalfile } = reqBody.form4;
        const { bundle, accesscontrol } = reqBody.form5;
        const { subworks } = reqBody.form6;
        
        await client.query('BEGIN'); // Start transaction

        console.log('====================================');
        console.log('Reached Here');
        console.log('====================================');

        console.log('====================================');
        console.log("Starting Form 1 submission !");
        console.log('====================================');
        

        // Insert form1 data
        const languageResult = await client.query('INSERT INTO language (language_id, language_name) VALUES ($1, $2) returning language_id', [language.language_id, language.language_name]);

        console.log('====================================');
        console.log("LanguageResult: ", languageResult);
        console.log('====================================');


        const languageId = languageResult.rows[0].language_id;

        

        const granthaTypeResult = await client.query('INSERT INTO granthatype (grantha_type_id, type_name) VALUES ($1, $2) RETURNING grantha_type_id', [granthatype.grantha_type_id, granthatype.type_name]);
        console.log('====================================');
        console.log("granthaTypeResult: ", granthaTypeResult);
        console.log('====================================');
        const granthaTypeId = granthaTypeResult.rows[0].id;
        
        const granthaDeckResult = await client.query('INSERT INTO granthadeck (grantha_deck_id, type_name) VALUES ($1, $2) RETURNING grantha_deck_id', [granthadeck.grantha_deck_id, granthadeck.type_name]);
        console.log('====================================');
        console.log("granthaDeckResult: ", granthaDeckResult);
        console.log('====================================');
        const granthaDeckId = granthaDeckResult.rows[0].id;

        const authorResult = await client.query('INSERT INTO author (author_id, name, birth_year, death_year, bio, scribe_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING author_id',
            [author.author_id, author.name, author.birth_year, author.death_year, author.bio, author.scribe_name]);
        console.log('====================================');
        console.log("authorResult: ", authorResult);
        console.log('====================================');
        const authorId = authorResult.rows[0].id;

        const locationResult = await client.query('INSERT INTO location (location_id, shelf_number, room_number) VALUES ($1, $2, $3) RETURNING location_id',
            [location.location_id, location.shelf_number, location.room_number]);
        console.log('====================================');
        console.log("locationResult: ", locationResult);
        console.log('====================================');
        const locationId = locationResult.rows[0].id;


        console.log('====================================');
        console.log("Form 1 submitted! but not yet saved to the DB");
        console.log('====================================');
        






        // Insert form2 data

        console.log('====================================');
        console.log("Starting Form 2 submission !");
        console.log('====================================');

        const granthaResult = await client.query(`INSERT INTO grantha (grantha_id, grantha_name, creation_date, description, grantha_deck_id, grantha_type_id, author_id, location_id, remarks)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING grantha_id`,
            [grantha.grantha_id, grantha.grantha_name, grantha.creation_date, grantha.description, grantha.grantha_deck_id, grantha.grantha_type_id, grantha.author_id, grantha.location_id, grantha.remarks]);
            
        console.log('====================================');
        console.log("granthaResult", granthaResult);
        console.log('====================================');
        const granthaId = granthaResult.rows[0].grantha_id;

        console.log('====================================');
        console.log("Form 2 submitted! but not yet saved to the DB");
        console.log('====================================');




        

        // Insert form3 data

        console.log('====================================');
        console.log("Starting Form 3 submission !");
        console.log('====================================');

        await client.query('INSERT INTO granthalanguage (grantha_id, language_id) VALUES ($1, $2)', [granthalanguage.grantha_id, granthalanguage.language_id]);

        console.log('====================================');
        console.log("granthalanguage submitted!");
        console.log('====================================');

        await client.query('INSERT INTO storagemechanism (storage_id, grantha_id, storage_type, backup_location, encryption_status, storage_location, last_backup_date, access_url, storage_notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [storagemechanism.storage_id, storagemechanism.grantha_id, storagemechanism.storage_type, storagemechanism.backup_location, storagemechanism.encryption_status, storagemechanism.storage_location, storagemechanism.last_backup_date, storagemechanism.access_url, storagemechanism.storage_notes]);

        
        console.log('====================================');
        console.log("storagemechanism submitted!");
        console.log('====================================');    
            
        await client.query('INSERT INTO physicalcondition (condition_id, grantha_id, condition_status, condition_notes, last_checked_date) VALUES ($1, $2, $3, $4, $5)',
            [physicalcondition.condition_id, physicalcondition.grantha_id, physicalcondition.condition_status, physicalcondition.condition_notes, physicalcondition.last_checked_date]);


        console.log('====================================');
        console.log("physicalcondition submitted!");
        console.log('====================================');   
            

        await client.query('INSERT INTO conservationhistory (conservation_id, grantha_id, conservation_date, description, cleaned) VALUES ($1, $2, $3, $4, $5)',
            [conservationhistory.conservation_id, conservationhistory.grantha_id, conservationhistory.conservation_date, conservationhistory.description, conservationhistory.cleaned]);

        console.log('====================================');
        console.log("conservationhistory submitted!");
        console.log('====================================');  

        console.log('====================================');
        console.log("Form 3 Submitted but not yet stored in DB");
        console.log('====================================');








        // Insert form4 data

        console.log('====================================');
        console.log("Starting Form 4 submission !");
        console.log('====================================');

        const scanningPropertiesResult = await client.query('INSERT INTO scanningproperties (scan_id, grantha_id, scanner_model, resolution_dpi, technician_name, lighting_conditions, color_depth, notes, file_format, page_count, scanning_start_date, scanning_completed_date, grayscale_completed_date, horizontal_or_vertical_scan, numbered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING scan_id',
            [scanningproperties.scan_id, scanningproperties.grantha_id, scanningproperties.scanner_model, scanningproperties.resolution_dpi, scanningproperties.technician_name, scanningproperties.lighting_conditions, scanningproperties.color_depth, scanningproperties.notes, scanningproperties.file_format, scanningproperties.page_count, scanningproperties.scanning_start_date, scanningproperties.scanning_completed_date, scanningproperties.grayscale_completed_date, scanningproperties.horizontal_or_vertical_scan, scanningproperties.numbered]);

        console.log('====================================');
        console.log("scanningproperties submitted!", scanningPropertiesResult);
        console.log('====================================');

        const scanId = scanningPropertiesResult.rows[0].scan_id;
            

        await client.query('INSERT INTO scannedimage (image_id, grantha_id, image_url, capture_date) VALUES ($1, $2, $3, $4)',
            [scannedimage.image_id, scannedimage.grantha_id, scannedimage.image_url, scannedimage.capture_date]);

        console.log('====================================');
        console.log("scannedimage submitted!");
        console.log('====================================');

        await client.query('INSERT INTO digitalfile (file_id, grantha_id, file_name, file_path, file_format, folder_size_in_gb, capture_time, version_number, thumbnail_url, scan_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [digitalfile.file_id, digitalfile.grantha_id, digitalfile.file_name, digitalfile.file_path, digitalfile.file_format, digitalfile.folder_size_in_gb, digitalfile.capture_time, digitalfile.version_number, digitalfile.thumbnail_url, digitalfile.scan_id]);

        console.log('====================================');
        console.log("digitalfile submitted!");
        console.log('====================================');

        console.log('====================================');
        console.log("Form 4 Submitted but not yet stored in DB");
        console.log('====================================');







        
        // Insert form5 data

        console.log('====================================');
        console.log("Starting Form 5 submission !");
        console.log('====================================');

        const bundleResult = await client.query('INSERT INTO bundle (bundle_id, grantha_id, bundle_origin, bundle_owner_name, bundle_number, bundle_received_date, sriv_number, bundle_returned_date, number_subwork, length, width, total_leaves, total_images, stitch_or_nonstitch, bundle_source_address, worked_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING bundle_id',
            [bundle.bundle_id, bundle.grantha_id, bundle.bundle_origin, bundle.bundle_owner_name, bundle.bundle_number, bundle.bundle_received_date, bundle.sriv_number, bundle.bundle_returned_date, bundle.number_subwork, bundle.length, bundle.width, bundle.total_leaves, bundle.total_images, bundle.stitch_or_nonstitch, bundle.bundle_source_address, bundle.worked_by]);

        const bundleId = bundleResult.rows[0].bundle_id;

        console.log('====================================');
        console.log("bundle submitted! ", bundleResult);
        console.log('====================================');

        await client.query('INSERT INTO accesscontrol (user_id, grantha_id, permission_level) VALUES ($1, $2, $3)',
            [accesscontrol.user_id, accesscontrol.grantha_id, accesscontrol.permission_level]);

        console.log('====================================');
        console.log("accesscontrol submitted!");
        console.log('====================================');

        console.log('====================================');
        console.log("Form 5 Submitted but not yet stored in DB");
        console.log('====================================');







        // Insert form6 data

        console.log('====================================');
        console.log("Starting Form 6 submission !");
        console.log('====================================');

        const subworksResult = await client.query('INSERT INTO subworks (subworker_id, name, bundle_id) VALUES ($1, $2, $3) RETURNING subworker_id',
            [subworks.subworker_id, subworks.name, subworks.bundle_id]);


        console.log('====================================');
        console.log("subworks submitted! ", subworksResult);
        console.log('====================================');

        const subworkerId = subworksResult.rows[0].subworker_id

        console.log("Subworker ID: ", subworkerId);
        

        console.log('====================================');
        console.log("Form 6 Submitted but not yet stored in DB");
        console.log('====================================');

        console.log('====================================');
        console.log("All the forms submitted successfully and data stored in the DB");
        console.log('====================================');

        await client.query('COMMIT'); // Commit transaction

        return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });


    } catch (error) {

        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error('Error inserting data:', error);
        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });

    } finally {
        client.release();
    }
}
