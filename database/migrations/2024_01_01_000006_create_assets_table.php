<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_asset')->unique();
            $table->foreignId('kategori_barang_id')->constrained('kategori_barangs')->onDelete('restrict');
            $table->string('nama_barang');
            $table->string('serial_number')->unique();
            $table->string('operation_system')->nullable();
            $table->enum('kondisi_perangkat', ['Baik', 'Rusak'])->default('Baik');
            $table->foreignId('site_id')->constrained('sites')->onDelete('restrict');
            $table->foreignId('area_posisi_id')->constrained('area_posisis')->onDelete('restrict');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('departemen_id')->constrained('departemens')->onDelete('restrict');
            $table->foreignId('jabatan_id')->constrained('jabatans')->onDelete('restrict');
            $table->enum('status', ['Used', 'Standby', 'Pinjam'])->default('Standby');
            $table->date('tanggal_serah_terima')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
            
            $table->index('nomor_asset');
            $table->index('serial_number');
            $table->index(['kondisi_perangkat', 'status']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};