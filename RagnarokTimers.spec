# -*- mode: python ; coding: utf-8 -*-
# PyInstaller spec per Ragnarok Timers
# Build: pyinstaller RagnarokTimers.spec --noconfirm
# Nota: il file ragnarok_timers.json viene creato accanto all'exe al primo avvio

a = Analysis(
    ["ragnarok_timers.py", "timers_core.py"],
    pathex=[],
    binaries=[],
    datas=[],
    hiddenimports=[
        "timers_core",
        # Importato solo dentro una funzione, PyInstaller non lo rileva.
        "winsound",
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[
        # tkinter serve: non va escluso.
        "matplotlib",
        "numpy",
        "pandas",
        "scipy",
        "PIL",
        "pytest",
        "setuptools",
        "unittest",
    ],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name="RagnarokTimers",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name="RagnarokTimers",
)
