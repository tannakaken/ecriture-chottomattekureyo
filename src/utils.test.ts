import { describe, it, expect } from 'vitest';
import { removeExtension } from './utils';

describe('removeExtension', () => {
	it('removes extension from a simple filename', () => {
		expect(removeExtension('file.txt')).toBe('file');
	});

	it('removes extension from a filename with multiple dots', () => {
		expect(removeExtension('archive.tar.gz')).toBe('archive.tar');
	});

	it('returns the same string if there is no extension', () => {
		expect(removeExtension('README')).toBe('README');
	});

	it('handles hidden files with extension', () => {
		expect(removeExtension('.env.local')).toBe('.env');
	});

	it('handles hidden files without extension', () => {
		expect(removeExtension('.gitignore')).toBe('');
	});

	it('removes extension from a filename with path', () => {
		expect(removeExtension('folder/file.txt')).toBe('folder/file');
	});

	it('removes extension from a filename with multiple dots and path', () => {
		expect(removeExtension('folder/archive.tar.gz')).toBe('folder/archive.tar');
	});

	it('handles empty string', () => {
		expect(removeExtension('')).toBe('');
	});

	it('handles filenames ending with a dot', () => {
		expect(removeExtension('file.')).toBe('file');
	});
});
