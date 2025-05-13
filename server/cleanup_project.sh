#!/bin/bash

echo "🧼 Starting Flask project cleanup..."

PROJECT_ROOT="/home/tinted/Garbage_collectors_registration_system"
SERVER_DIR="$PROJECT_ROOT/server"
MAIN_APP_DIR="$SERVER_DIR/app"
BACKUP_DIR="$HOME/OLD_app_backup_$(date +%Y%m%d_%H%M%S)"

echo "🔍 Finding duplicate 'app' folders..."
APP_PATHS=$(find "$PROJECT_ROOT" -type d -name "app" | grep -v "$MAIN_APP_DIR")

if [[ ! -z "$APP_PATHS" ]]; then
    echo "⚠️ Found potentially conflicting 'app' folders:"
    echo "$APP_PATHS"
    echo "📦 Backing them up to: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    for path in $APP_PATHS; do
        mv "$path" "$BACKUP_DIR/"
        echo "✅ Moved $path to backup"
    done
else
    echo "✅ No conflicting 'app' folders found."
fi

echo "🧹 Cleaning __pycache__ folders and .pyc files..."
find "$PROJECT_ROOT" -type d -name '__pycache__' -exec rm -r {} +
find "$PROJECT_ROOT" -type f -name '*.pyc' -delete
echo "✅ Bytecode cleaned."

echo "🔎 Checking for old import references like 'MainProject'..."
grep -rnw "$MAIN_APP_DIR" -e 'MainProject' || echo "✅ No bad imports found."

echo "🛠️ Writing or updating .flaskenv in $SERVER_DIR"
cat > "$SERVER_DIR/.flaskenv" <<EOL
FLASK_APP=app:create_app
FLASK_ENV=development
EOL

echo "✅ .flaskenv created with proper settings."

echo "🚀 Cleanup complete!"
echo "📍 Now run this to start your app:"
echo ""
echo "  cd $SERVER_DIR && flask run"
echo ""
