import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    let client;
    try {
        client = await pool.connect();
        
        const query = `
            SELECT DISTINCT on (g.grantha_id)
                ac.user_id, ac.permission_level,
                u.username,
                g.grantha_name, g.creation_date, g.description, g.remarks,
                l.language_name,
                gt.type_name AS grantha_type,
                gd.type_name AS grantha_deck_type,
                a.name AS author_name, a.birth_year, a.death_year, a.bio, a.scribe_name,
                loc.shelf_number, loc.room_number,
                s.storage_type, s.backup_location, s.encryption_status, s.storage_location, s.last_backup_date, s.access_url, s.storage_notes,
                pc.condition_status, pc.condition_notes, pc.last_checked_date,
                ch.conservation_date, ch.description AS conservation_desc, ch.cleaned,
                sp.scanner_model, sp.resolution_dpi, sp.technician_name, sp.lighting_conditions, sp.color_depth, sp.notes, sp.file_format, sp.page_count, sp.scanning_start_date, sp.scanning_completed_date, sp.grayscale_completed_date, sp.horizontal_or_vertical_scan, sp.numbered,
                si.image_url, si.capture_date,
                df.file_name, df.file_path, df.file_format, df.folder_size_in_gb, df.capture_time, df.version_number, df.thumbnail_url,
                b.bundle_origin, b.bundle_owner_name, b.bundle_number, b.bundle_received_date, b.sriv_number, b.bundle_returned_date, b.number_subwork, b.length, b.width, b.total_leaves, b.total_images, b.stitch_or_nonstitch, b.bundle_source_address, b.worked_by,
                sw.name AS subwork_name
            FROM grantha g
            LEFT JOIN granthalanguage gl ON g.grantha_id = gl.grantha_id
            LEFT JOIN language l ON gl.language_id = l.language_id
            LEFT JOIN granthatype gt ON g.grantha_type_id = gt.grantha_type_id
            LEFT JOIN granthadeck gd ON g.grantha_deck_id = gd.grantha_deck_id
            LEFT JOIN author a ON g.author_id = a.author_id
            LEFT JOIN location loc ON g.location_id = loc.location_id
            LEFT JOIN storagemechanism s ON g.grantha_id = s.grantha_id
            LEFT JOIN physicalcondition pc ON g.grantha_id = pc.grantha_id
            LEFT JOIN conservationhistory ch ON g.grantha_id = ch.grantha_id
            LEFT JOIN scanningproperties sp ON g.grantha_id = sp.grantha_id
            LEFT JOIN scannedimage si ON g.grantha_id = si.grantha_id
            LEFT JOIN digitalfile df ON g.grantha_id = df.grantha_id
            LEFT JOIN bundle b ON g.grantha_id = b.grantha_id
            LEFT JOIN accesscontrol ac ON g.grantha_id = ac.grantha_id
            LEFT JOIN useraccount u ON ac.user_id = u.user_id
            LEFT JOIN subworks sw ON b.bundle_id = sw.bundle_id

            ORDER BY g.grantha_id ASC;
        `;

        const result = await client.query(query);
        return NextResponse.json(result.rows, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        if (client) client.release();
    }
}
